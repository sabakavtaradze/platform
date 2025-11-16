import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../user/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private connectionReady = false;

  private coreListenersRegistered = false;
  // Message events
  private messageReceivedSource = new BehaviorSubject<any>(null);
  messageReceived$ = this.messageReceivedSource.asObservable();

  // Unseen count events
  private unseenCountSource = new BehaviorSubject<number>(0);
  unseenCount$ = this.unseenCountSource.asObservable();

  constructor(private authService: AuthenticationService) {}

  async startConnection(): Promise<void> {
    try {
      if (this.connectionReady) {
        return;
      }

      const token = this.authService.getAuthToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.apiUrl}/chatHub`, {
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      // Start the connection
      await this.hubConnection.start();
      console.log('SignalR Connected');

      // Register listeners AFTER connection
      this.listenForMessages();
      this.registerCoreListeners();
      // Join user room after connection
      await this.hubConnection.invoke('JoinUserRoom');
      console.log('Joined user room');

      this.connectionReady = true;
    } catch (err) {
      this.connectionReady = false;
      console.error('SignalR connection failed:', err);
      throw err;
    }
  }

  async joinChatRoom(chatRoomId: number): Promise<void> {
    try {
      if (!this.connectionReady) {
        await this.startConnection();
      }

      if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
        await this.hubConnection.invoke('JoinChatRoom', chatRoomId);
        console.log('Joined chat room:', chatRoomId);
      } else {
        throw new Error('SignalR not connected');
      }
    } catch (err) {
      console.error('Failed to join chat room:', err);
      throw err;
    }
  }

  listenForMessages(): void {
    if (!this.hubConnection) return;

    this.hubConnection.on('ReceiveMessage', (msg) => {
      // Log the raw message to help debug
      console.log('>>> SignalR raw message:', msg);
      // If msg is wrapped, unwrap it
      const payload = msg?.data ? msg.data : msg;
      console.log('>>> SignalR normalized payload:', payload);
      this.messageReceivedSource.next(payload);
      // After every message, refresh unseen count from backend
      this.refreshUnseenCount();
    });
  }

  private registerCoreListeners(): void {
    if (!this.hubConnection || this.coreListenersRegistered) return;

    // Server-pushed unseen count (exact casing unknown, register both)
    const unseenHandler = (count: any) => {
      console.log('>>> SignalR unseen count push:', count);
      const numeric = typeof count === 'number' ? count : count?.data;
      if (typeof numeric === 'number') {
        this.unseenCountSource.next(numeric);
      } else {
        console.warn('Unseen count push malformed, ignoring:', count);
      }
    };

    this.hubConnection.on('unseencountchanged', unseenHandler);
    this.hubConnection.on('UnseenCountChanged', unseenHandler);
    this.coreListenersRegistered = true;
  }

  // Explicit method to refresh unseen count (can be called by components too)
  refreshUnseenCount(): void {
    this.authService.getUnseenCount().subscribe((res) => {
      if (res.isSuccess && typeof res.data === 'number') {
        this.unseenCountSource.next(res.data);
      } else {
        // On failure, do not overwrite with bogus value; keep previous
        console.warn('Unseen count refresh failed:', res.errorMessage);
      }
    });
  }
}
