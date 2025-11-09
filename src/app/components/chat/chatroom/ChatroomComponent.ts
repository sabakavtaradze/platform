import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { ChatroomService } from 'src/app/services/user/chatroom/chatroom.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-rservice.service';
import { firstValueFrom } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
  queries: {
    contentRef: new ViewChild('contentRef'),
  },
})
export class ChatroomComponent implements OnInit, OnDestroy {
  // Form
  chatForm: FormGroup;

  // Chat state
  chatId!: number;
  messageList: any[] = [];
  currentUser: any;
  otherUserName = '';
  otherUserId = 0;
  // message ordering: keep messages in DESC by SentAt (newest first)
  private descending = true;
  
 headerBackName = '/chat';
 chatroomMenu = true;

  // Image handling
  private imagePreview: string | null = null;
  selectedImages: string[] = []; // base64 images

  // Pagination
  private skip = 0;
  private take = 20;
  private loading = false;
  private allLoaded = false;

  // Subscriptions
  private subs = new Subscription();

  // get the scroll container (your HTML already has #scrollMe on the div)
  @ViewChild('scrollMe', { static: false }) scrollMe!: ElementRef<HTMLDivElement>;

  constructor(
    private fb: FormBuilder,
    private authguard: AuthenticationService,
    private chatroomService: ChatroomService,
    private route: ActivatedRoute,
    private chatSignalR: SignalRService
  ) {
    this.chatForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  // ---------- Lifecycle ----------
  async ngOnInit() {
    this.chatId = Number(this.route.snapshot.paramMap.get('chatId'));
    this.currentUser = await this.authguard.GuardUserAuth();
    // Start SignalR and load initial data
    try {
      // Setup SignalR - this also sets up message listener
      await this.chatSignalR.startConnection();
      
      // Join this specific chat room
      await this.chatSignalR.joinChatRoom(this.chatId);

      // Subscribe to messages
      this.getmessages()
    } catch (e) {
      console.error('SignalR setup failed:', e);
    }

    this.getChatroomById(this.chatId);
    
    // Try to load the full chat history on init (useful when you want entire conversation)
    // If it fails or returns empty, fall back to the paged loader.
    try {
      const res = await firstValueFrom(this.chatroomService.getHistory(this.chatId));
      if (res?.isSuccess) {
  const allDesc: any[] = res.data || [];
  // backend returns DESC by SentAt — keep DESC (newest -> oldest)
  this.messageList = [...allDesc];
  console.log(this.messageList);
        // mark as all loaded (we fetched entire history)
        this.allLoaded = true;
        // ensure skip matches total so paged loader won't re-request the same items
        this.skip = allDesc.length;

        // after load, position viewport: for descending lists show newest at top
        setTimeout(() => {
          if (this.descending) {
            this.scrollToTop();
          } else {
            this.scrollToBottom();
          }
        }, 0);

        // mark messages as read
        this.subs.add(
          this.chatroomService.markRead(this.chatId).subscribe({
            error: (error) => console.error('Failed to mark messages as read:', error),
          })
        );
      } else {
        // fallback to paged initial load (safer for very large histories)
        await this.initialLoad();
      }
    } catch (err) {
      console.warn('Full history load failed, falling back to paged load:', err);
      await this.initialLoad();
    }
  }
getmessages() {
  this.subs.add(
    this.chatSignalR.messageReceived$.subscribe(msg => {
      if (!msg) return;

      console.log('Received message structure:', msg);

      // The server sends messages with specific fields:
      // messageID, senderID, recipientID, content, images, isRead, sentAt
      const message = {
        ...msg,
        chatRoomId: this.chatId, // Ensure it has chatRoomId for consistency
        senderId: msg.senderID,   // normalize case for component usage
      };

      // Always add to list - we're already in the correct chat room because of SignalR groups
      if (this.descending) {
        console.log('Adding message to start of list:', message);
        this.messageList = [message, ...this.messageList];
        setTimeout(() => this.scrollToTop(), 0);
      } else {
        console.log('Adding message to end of list:', message);
        this.messageList = [...this.messageList, message];
        setTimeout(() => this.scrollToBottom(), 0);
      }

      // Mark as read
      this.subs.add(
        this.chatroomService.markRead(this.chatId).subscribe({
          error: (error) => console.error('Failed to mark message as read:', error)
        })
      );
    })
  );
}
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // ---------- Header info ----------
  getChatroomById(id: number) {
    this.subs.add(
      this.chatroomService.getChatRoomById(id).subscribe((res) => {
        if (res?.isSuccess) {
          this.otherUserName = res.data.otherUsername;
          this.otherUserId = res.data.otherUserId;
          console.log(res)
        }
      })
    );
  }

  // ---------- Message Sending ----------
  sendMessage(form: FormGroup) {
    const content = (form.value.text || '').trim() || null;
    const images = this.selectedImages.length ? this.selectedImages : null;
    if (!content && !images) return;

    const dto = {
      recipientID: 0, // backend ignores when ChatRoomId is provided
      chatRoomId: this.chatId,
      content,
      images,
    };

    this.subs.add(
      this.chatroomService.sendMessage(dto).subscribe({
        next: (res) => {
          if (res?.isSuccess && res.data) {
            // Local update - SignalR will also broadcast this
            if (this.descending) {
              this.messageList = [res.data, ...this.messageList];
              setTimeout(() => this.scrollToTop(), 0);
            } else {
              this.messageList = [...this.messageList, res.data];
              setTimeout(() => this.scrollToBottom(), 0);
            }
          }
          // Reset form state
          this.chatForm.reset();
          this.selectedImages = [];
          this.imagePreview = null;
        },
        error: (error) => {
          console.error('Failed to send message:', error);
        }
      })
    );
  }

  // ---------- Image Handling ----------
  async onFileSelected(event: any): Promise<void> {
    const files: FileList = event.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      try {
        const base64 = await this.readAsDataURL(file);
        this.imagePreview = base64;          // preview last chosen
        this.selectedImages.push(base64);    // queue for sending
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  }

  private readAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = (error) => reject(`Error reading file: ${error}`);
      reader.readAsDataURL(file);
    });
  }

  // ---------- Scroll Handling ----------
  onScrollUp(event: any) {
    const el = event.target as HTMLElement;
    // If user scrolls near top, load older messages
    if (el.scrollTop <= 20 && !this.loading && !this.allLoaded) {
      this.loadOlderMessages();
    }
  }

  private scrollToBottom() {
    const box = this.scrollMe?.nativeElement;
    if (box) box.scrollTop = box.scrollHeight;
  }

  private scrollToTop() {
    const box = this.scrollMe?.nativeElement;
    if (box) box.scrollTop = 0;
  }

  // ---------- Message Loading ----------
  private async initialLoad() {
    this.skip = 0;
    this.allLoaded = false;
    this.messageList = [];

    await this.fetchPage(true);
    
    // After first load, position viewport according to ordering
    setTimeout(() => {
      if (this.descending) this.scrollToTop();
      else this.scrollToBottom();
    }, 0);

    // Mark messages as read
    this.subs.add(
      this.chatroomService.markRead(this.chatId).subscribe({
        error: (error) => console.error('Failed to mark messages as read:', error)
      })
    );
  }

  private loadOlderMessages() {
    if (this.loading || this.allLoaded) return;
    this.fetchPage(false);
  }
  deleteMessage(event:any) {
  
  }
  
  /**
   * Fetches a page of messages from the backend.
   * - Backend returns messages in DESC order by SentAt
   * - We convert to ASC for display (oldest → newest)
   * - When loading older messages, we prepend while preserving scroll position
   */
  private fetchPage(isFirstLoad: boolean) {
    this.loading = true;

    this.subs.add(
      this.chatroomService.getHistoryPaged(this.chatId, this.skip, this.take).subscribe({
        next: (res) => {
          if (!res?.isSuccess) {
            console.error('Failed to fetch messages:', res?.errorMessage);
            this.loading = false;
            return;
          }

          const pageDesc: any[] = res.data || [];
          if (pageDesc.length === 0) {
            this.allLoaded = true;
            this.loading = false;
            return;
          }

          // Backend returns DESC by SentAt. Keep DESC ordering (newest -> oldest)
          const page = [...pageDesc];

          if (isFirstLoad) {
            this.messageList = page;
          } else {
            // For DESC lists, older messages come after current list, so append them
            const box = this.scrollMe?.nativeElement;
            const prevScrollTop = box?.scrollTop || 0;


            // After DOM update, restore previous scrollTop so viewport stays anchored
            setTimeout(() => {
              if (!box) return;
              box.scrollTop = prevScrollTop;
            }, 0);
          }

          // Update skip for next page
          this.skip += page.length;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching messages:', error);
          this.loading = false;
        },
      })
    );
  }
}
