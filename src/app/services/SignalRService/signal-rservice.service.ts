import { Injectable, NgZone } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../user/authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private hubConnection?: signalR.HubConnection;
  private connectionReady = false;
  private startingPromise: Promise<void> | null = null;
  private reconnecting = false;
  private coreListenersRegistered = false;
  private messageHandlersAttached = false;
  private authListenersRegistered = false;
  private refreshingToken = false;
  private pendingInvokes: Array<{ method: string; args: any[] }> = [];

  private messageReceivedSource = new BehaviorSubject<any>(null);
  messageReceived$ = this.messageReceivedSource.asObservable();

  private unseenCountSource = new BehaviorSubject<number>(0);
  unseenCount$ = this.unseenCountSource.asObservable();

  private chatListEventSource = new BehaviorSubject<any>(null);
  chatListEvent$ = this.chatListEventSource.asObservable();

  constructor(private authService: AuthenticationService, private zone: NgZone) { }

  async startConnection(): Promise<void> {
    if (this.connectionReady) return;
    if (this.startingPromise) return this.startingPromise;
    this.startingPromise = this.internalStart();
    try {
      await this.startingPromise;
    } finally {
      this.startingPromise = null;
    }
  }

  private async internalStart(): Promise<void> {
    try {
      if (this.connectionReady) return;
      const token = this.authService.getAuthToken();
      if (!token) throw new Error('No authentication token available');

      if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connecting) {
        await this.waitForState(signalR.HubConnectionState.Connected, 8000);
        return;
      }

      const isLocal = this.isLocalEnvironment();
      const url = this.resolveHubUrl(isLocal);
      const builder = new signalR.HubConnectionBuilder().configureLogging(signalR.LogLevel.Information);

      if (isLocal) {
        // Allow negotiation & fallback transports locally (self-signed cert / WS handshake issues)
        this.hubConnection = builder
          .withUrl(url, {
            accessTokenFactory: () => token,
            // Do NOT force WebSockets locally; allow SSE/LongPolling if WS fails
            skipNegotiation: false
          })
          .withAutomaticReconnect([0, 2000, 5000, 10000, 20000])
          .build();
        console.log('[SignalR] Local mode: allowing fallback transports');
      } else {
        // Production: prefer WebSockets
        this.hubConnection = builder
          .withUrl(url, {
            accessTokenFactory: () => token,
            transport: signalR.HttpTransportType.WebSockets,
            skipNegotiation: false
          })
          .withAutomaticReconnect([0, 2000, 5000, 10000, 20000])
          .build();
        console.log('[SignalR] Prod mode: forcing WebSockets');
      }

      // Tighter keep-alive + server timeout tuning for Render idle cycles
      // (these properties exist on HubConnection but are not in type defs prior to certain versions)
      try {
        // @ts-ignore
        this.hubConnection.keepAliveIntervalInMilliseconds = 15000; // Ping every 15s
        // @ts-ignore
        this.hubConnection.serverTimeoutInMilliseconds = 60000; // Consider server dead after 60s no msg
        console.log('[SignalR] KeepAlive/Timeout configured');
      } catch (e) {
        console.warn('[SignalR] keepAlive/serverTimeout set failed', e);
      }

      this.attachLifecycleHandlers();
      await this.hubConnection.start();
      console.log('[SignalR] Connected');
      console.log('[SignalR] Transport:', (this.hubConnection as any).connection?._transport?.name);
      console.log('[SignalR] State after start:', signalR.HubConnectionState[this.hubConnection.state]);

      this.listenForMessages();
      this.registerCoreListeners();
      this.registerAuthListeners();

      if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
        await this.safeInvoke('JoinUserRoom');
      }
      this.connectionReady = true;
      this.flushPendingInvokes();
    } catch (err) {
      this.connectionReady = false;
      console.error('[SignalR] connection failed:', err);
      throw err;
    }
  }

  private attachLifecycleHandlers(): void {
    if (!this.hubConnection) return;
    this.hubConnection.onreconnecting(error => {
      this.reconnecting = true;
      console.warn('[SignalR] Reconnecting...', error);
    });
    this.hubConnection.onreconnected(id => {
      this.reconnecting = false;
      this.connectionReady = true;
      console.log('[SignalR] Reconnected', id);
      this.safeInvoke('JoinUserRoom');
      this.flushPendingInvokes();
    });
    this.hubConnection.onclose(error => {
      this.connectionReady = false;
      console.warn('[SignalR] Closed', error);
    });
  }

  private async waitForState(target: signalR.HubConnectionState, timeoutMs: number): Promise<void> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      if (this.hubConnection?.state === target) return;
      await new Promise(r => setTimeout(r, 150));
    }
    throw new Error(`Timeout waiting for state ${signalR.HubConnectionState[target]}`);
  }

  async joinChatRoom(chatRoomId: number): Promise<void> {
    await this.startConnection();
    if (this.hubConnection?.state !== signalR.HubConnectionState.Connected) {
      // Defer join until connected
      this.pendingInvokes.push({ method: 'JoinChatRoom', args: [chatRoomId] });
      console.warn('[SignalR] JoinChatRoom deferred until connected');
      return;
    }
    await this.safeInvoke('JoinChatRoom', chatRoomId);
    console.log('[SignalR] Joined chat room', chatRoomId);
    // Re-ensure listeners after join (idempotent)
    this.listenForMessages();
  }

  private async safeInvoke(method: string, ...args: any[]): Promise<void> {
    if (!this.hubConnection) {
      console.warn('[SignalR] safeInvoke without hubConnection', method);
      return;
    }
    if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
      // Queue invocation
      this.pendingInvokes.push({ method, args });
      console.warn('[SignalR] Invocation queued (not connected):', method);
      return;
    }
    try {
      await this.hubConnection.invoke(method, ...args);
    } catch (e) {
      console.warn(`[SignalR] invoke failed for ${method}`, e);
      // If transient, requeue once
      if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
        this.pendingInvokes.push({ method, args });
      }
    }
  }

  private flushPendingInvokes(): void {
    if (!this.hubConnection || this.hubConnection.state !== signalR.HubConnectionState.Connected) return;
    if (!this.pendingInvokes.length) return;
    const queue = [...this.pendingInvokes];
    this.pendingInvokes = [];
    queue.forEach(async (item) => {
      try {
        await this.hubConnection!.invoke(item.method, ...item.args);
        console.log('[SignalR] Flushed invoke:', item.method, item.args);
      } catch (e) {
        console.warn('[SignalR] Flush invoke failed, re-queueing', item.method, e);
        this.pendingInvokes.push(item); // Put back for next reconnect
      }
    });
  }

  listenForMessages(): void {
    if (!this.hubConnection) return;
    if (this.messageHandlersAttached) return;
    this.messageHandlersAttached = true;
    const events = [
      'ReceiveMessage',
      'MessageReceived',
      'ChatMessageCreated',
      'ReceiveChatMessage',
      'ReceiveChatroomMessage',
      'ChatMessage',
      'MessageCreated'
    ];
    const handler = (raw: any) => {
      this.zone.run(() => {
        const msg = raw?.data ? raw.data : raw;
        if (msg?.chatroomID && !msg.chatRoomId) msg.chatRoomId = msg.chatroomID;
        if (msg?.chatroomId && !msg.chatRoomId) msg.chatRoomId = msg.chatroomId;
        if (msg?.messageID && !msg.id) msg.id = msg.messageID;
        this.messageReceivedSource.next(msg);
        this.refreshUnseenCount();
      });
    };
    events.forEach(ev => {
      try {
        this.hubConnection!.on(ev, handler);
        console.log(`[SignalR] Listening for ${ev}`);
      } catch (e) {
        console.warn(`[SignalR] Failed to register ${ev}`, e);
      }
    });
    // Generic catch-all diagnostic (if server emits a custom broadcast we didn't list)
    try {
      // @ts-ignore optional diagnostic handler name
      this.hubConnection.on('Receive', (raw: any) => console.log('[SignalR] Generic Receive event', raw));
    } catch { }

    // Chat list changes: trigger refresh in UI
    const chatEvents = ['ChatListUpdated', 'ChatUpdated', 'ChatCreated', 'ChatDeleted'];
    chatEvents.forEach(ev => {
      try {
        this.hubConnection!.on(ev, (payload: any) => {
          this.zone.run(() => {
            console.log(`[SignalR] Chat list event ${ev}`, payload);
            this.chatListEventSource.next({ type: ev, payload });
            this.refreshUnseenCount();
          });
        });
      } catch (e) {
        console.warn(`[SignalR] Failed to register chat event ${ev}`, e);
      }
    });

    // Extra diagnostic: log ANY invocation if debug flag set
    const debug = (window as any).signalRDebug === true;
    if (debug) {
      const original = (this.hubConnection as any).on.bind(this.hubConnection);
      (this.hubConnection as any).on = (ev: string, cb: any) => {
        original(ev, (payload: any) => {
          console.log('[SignalR][Frame]', ev, payload);
          cb(payload);
        });
      };
      console.log('[SignalR] Debug frame logger active');
    }
  }

  private registerCoreListeners(): void {
    if (!this.hubConnection || this.coreListenersRegistered) return;
    const unseenHandler = (count: any) => {
      const numeric = typeof count === 'number' ? count : count?.data;
      if (typeof numeric === 'number') this.unseenCountSource.next(numeric);
    };
    this.hubConnection.on('unseencountchanged', unseenHandler);
    this.hubConnection.on('UnseenCountChanged', unseenHandler);
    this.coreListenersRegistered = true;
  }

  private registerAuthListeners(): void {
    if (!this.hubConnection || this.authListenersRegistered) return;
    const refreshEvents = ['RefreshToken', 'RefreshUserToken', 'TokenRefreshRequested'];
    const handler = () => {
      this.zone.run(() => {
        console.log('[SignalR] Received token refresh request');
        this.scheduleTokenRefresh();
      });
    };
    refreshEvents.forEach((event) => {
      try {
        this.hubConnection!.on(event, handler);
        console.log(`[SignalR] Listening for auth event ${event}`);
      } catch (e) {
        console.warn(`[SignalR] Failed to register auth event ${event}`, e);
      }
    });
    this.authListenersRegistered = true;
  }

  private scheduleTokenRefresh(): void {
    if (this.refreshingToken) {
      console.log('[SignalR] Token refresh already in progress, skipping');
      return;
    }
    this.refreshingToken = true;
    this.authService.refreshToken().pipe(finalize(() => (this.refreshingToken = false))).subscribe({
      next: (res) => {
        if (res?.isSuccess) {
          console.log('[SignalR] Token refresh succeeded via signal');
        } else {
          console.warn('[SignalR] Token refresh via signal failed', res.errorMessage || res.message);
        }
      },
      error: (err) => console.warn('[SignalR] Token refresh error', err)
    });
  }

  refreshUnseenCount(): void {
    this.authService.getUnseenCount().subscribe({
      next: res => {
        if (res.isSuccess && typeof res.data === 'number') {
          this.unseenCountSource.next(res.data);
        }
      },
      error: e => console.warn('[SignalR] unseen count error', e)
    });
  }

  private isLocalEnvironment(): boolean {
    return /(localhost|127\.0\.0\.1)/i.test(location.hostname);
  }

  /**
   * Build the SignalR hub URL dynamically so we can keep the existing environment files untouched,
   * yet still connect to the localhost backend when running dev mode and the remote backend in prod.
   */
  private resolveHubUrl(isLocal: boolean): string {
    const configured = (environment.apiUrl || '').replace(/\/+$/, '');
    const hubPath = '/chatHub';
    if (configured) {
      // Trust the configured API endpoint (dev or prod) when available; allows HTTPS even if the SPA runs over HTTP.
      return `${configured}${hubPath}`;
    }
    if (isLocal) {
      const fallbackPort = this.extractPort(location.origin) ?? '7274';
      return `${location.protocol}//${location.hostname}:${fallbackPort}${hubPath}`;
    }
    return `${location.origin}${hubPath}`;
  }

  private extractPort(configuredUrl: string): string | null {
    if (!configuredUrl) {
      return null;
    }
    try {
      const parsed = new URL(configuredUrl);
      return parsed.port || null;
    } catch (error) {
      return null;
    }
  }
}
