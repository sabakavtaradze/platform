import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import heic2any from 'heic2any';
import { firstValueFrom, Subscription } from 'rxjs';
import { SignalRService } from 'src/app/services/SignalRService/signal-rservice.service';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { ChatroomService } from 'src/app/services/user/chatroom/chatroom.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
  queries: {
    contentRef: new ViewChild('contentRef'),
  },
})
export class ChatroomComponent implements OnInit, OnDestroy, AfterViewInit {
  chatForm: FormGroup;

  chatId!: number;
  messageList: any[] = [];
  currentUser: any;
  otherUserName = '';
  otherUserId = 0;
  imageprews: string[] = [];

  private descending = false;

  headerBackName = '/chat';
  chatroomMenu = true;

  imageprewsForRemove: Array<{ file: File; url: string }> = [];
  private objectUrls: string[] = [];
  private files: FileList | null = null;
  private filesUpdate: FileList | null = null;

  private skip = 0;
  private take = 20;
  private loading = false;
  private allLoaded = false;
  private seenMessageIds = new Set<number>();

  private subs = new Subscription();

  @ViewChild('scrollMe', { static: false }) scrollMe!: ElementRef<HTMLDivElement>;
  @ViewChild('composer', { static: false }) composer!: ElementRef<HTMLDivElement>;
  private composerHeight: number = 0;
  private composerResizeObs?: ResizeObserver;

  constructor(
    private fb: FormBuilder,
    private authguard: AuthenticationService,
    private chatroomService: ChatroomService,
    private route: ActivatedRoute,
    private router: Router,
    private chatSignalR: SignalRService
  ) {
    this.chatForm = this.fb.group({
      content: [''],
    });
  }

  // -------------------------------------------------------------
  // 🔥 ADD TRACKBY — BEST PERFORMANCE UPGRADE
  // -------------------------------------------------------------
  trackByMessage(index: number, message: any) {
    return message.messageID ?? message.id;
  }

  // ---------- Lifecycle ----------
  async ngOnInit() {
    this.chatId = Number(this.route.snapshot.paramMap.get('chatId'));
    this.currentUser = await this.authguard.GuardUserAuth();

    try {
      await this.chatSignalR.startConnection();
      await this.chatSignalR.joinChatRoom(this.chatId);
      this.getmessages();
    } catch (e) {
      console.error('SignalR setup failed:', e);
    }

    this.getChatroomById(this.chatId);

    try {
      const res = await firstValueFrom(this.chatroomService.getHistory(this.chatId));
      if (res?.isSuccess) {
        const allDesc: any[] = res.data || [];
        this.messageList = [...allDesc].reverse();
        this.allLoaded = true;
        this.skip = allDesc.length;

        setTimeout(() => this.scrollToBottom(), 0);

        this.subs.add(
          this.chatroomService.markRead(this.chatId).subscribe({
            error: (error) => console.error('Failed to mark messages as read:', error),
          })
        );
      } else {
        await this.initialLoad();
      }
    } catch (err) {
      await this.initialLoad();
    }
  }

  ngAfterViewInit(): void {
    this.measureComposer();
    try {
      if ('ResizeObserver' in window && this.composer?.nativeElement) {
        this.composerResizeObs = new ResizeObserver(() => this.measureComposer());
        this.composerResizeObs.observe(this.composer.nativeElement);
      }
    } catch {}
  }

  private measureComposer() {
    if (!this.composer) return;
    this.composerHeight = this.composer.nativeElement.offsetHeight || 0;
    const box = this.scrollMe?.nativeElement;
    if (box) {
      box.style.paddingBottom = `${this.composerHeight + 8}px`;
    }
  }

  // ---------- FIXED REAL-TIME MESSAGE RECEIVE ----------
  getmessages() {
    this.subs.add(
      this.chatSignalR.messageReceived$.subscribe((msg) => {
        if (!msg) return;

        const message = {
          ...msg,
          chatRoomId: this.chatId,
          senderId: msg.senderID,
        };

        const messageId: number | undefined = (message as any).messageID ?? (message as any).id;

        if (messageId && this.seenMessageIds.has(messageId)) return;
        if (messageId) this.seenMessageIds.add(messageId);

        this.messageList.push(message);

        this.scrollToBottomSafe();
      })
    );
  }

  private scrollToBottomSafe() {
    const box = this.scrollMe?.nativeElement;
    if (!box) return;

    const nearBottom = box.scrollHeight - (box.scrollTop + box.clientHeight) < 120;

    if (nearBottom) {
      requestAnimationFrame(() => {
        box.scrollTop = box.scrollHeight;
      });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    try {
      this.composerResizeObs?.disconnect();
    } catch {}
    for (const url of this.objectUrls) {
      try {
        URL.revokeObjectURL(url);
      } catch {}
    }
    this.objectUrls = [];
  }

  isSendDisabled(): boolean {
    const contentVal = (this.chatForm.get('content')?.value || '').trim();
    const hasText = contentVal.length > 0;
    const hasImages = this.imageprewsForRemove.length > 0;
    return !(hasText || hasImages);
  }

  getChatroomById(id: number) {
    this.subs.add(
      this.chatroomService.getChatRoomById(id).subscribe((res) => {
        if (res?.isSuccess) {
          this.otherUserName = res.data.otherUsername;
          this.otherUserId = res.data.otherUserId;
        }
      })
    );
  }

  sendMessage(form: FormGroup) {
    const raw = (form.value.content || '').trim();
    const content: string | undefined = raw.length ? raw : undefined;

    const selectedFiles: File[] = this.imageprewsForRemove.map((e) => e.file);

    if (!content && selectedFiles.length === 0) return;

    const dto = {
      chatRoomId: this.chatId,
      ...(content ? { content } : {}),
      ...(selectedFiles.length ? { images: selectedFiles } : {}),
    };

    this.subs.add(
      this.chatroomService.sendMessage(dto).subscribe({
        next: (res) => {
          if (res?.isSuccess && res.data) {
            const optimistic = res.data;
            const optimisticId: number | undefined =
              (optimistic as any).messageID ?? (optimistic as any).id;

            if (optimisticId && !this.seenMessageIds.has(optimisticId)) {
              this.seenMessageIds.add(optimisticId);
              this.messageList.push(optimistic);
              this.scrollToBottomSafe();
            }
          }

          this.chatForm.reset();
          this.imageprews = [];
          this.imageprewsForRemove = [];
          this.files = null;
          this.filesUpdate = null;
        },
        error: (error) => console.error('Failed to send message:', error),
      })
    );
  }

  onFileSelected(event: any) {
    const newFiles: FileList = event?.target?.files;
    if (!newFiles || newFiles.length === 0) return;

    if (this.filesUpdate) {
      const allFiles = [...Array.from(this.filesUpdate), ...Array.from(newFiles)];
      const dt = new DataTransfer();
      allFiles.forEach((f) => dt.items.add(f));
      this.filesUpdate = dt.files;
      this.files = dt.files;
    } else {
      this.files = newFiles;
      this.filesUpdate = newFiles;
    }

    this.previewBase64(newFiles);
    this.measureComposer();
  }

  private async previewBase64(filesToPreview: FileList) {
    const filesArray = Array.from(filesToPreview);

    for (const file of filesArray) {
      const jpegBase64 = await this.convertToJpegBase64(file);
      this.imageprews.push(jpegBase64);
      this.imageprewsForRemove.push({ file, url: jpegBase64 });
    }
  }

  private preview(filesToPreview: FileList) {}

  removeImg(image: string) {
    this.imageprewsForRemove = this.imageprewsForRemove.filter((e) => e.url !== image);
    this.imageprews = this.imageprews.filter((e) => e !== image);

    const dt = new DataTransfer();
    this.imageprewsForRemove.forEach((f) => dt.items.add(f.file));
    this.files = dt.files;
    this.filesUpdate = dt.files;
    this.measureComposer();
  }

  private async convertToJpegBase64(file: File): Promise<string> {
    try {
      if (
        file.type.includes('heic') ||
        file.name.toLowerCase().endsWith('.heic') ||
        file.type.includes('heif')
      ) {
        const converted = (await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.9,
        })) as Blob;

        return await this.blobToBase64(converted);
      }

      const bitmap = await createImageBitmap(file);

      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas missing');

      ctx.drawImage(bitmap, 0, 0);

      return canvas.toDataURL('image/jpeg', 0.9);
    } catch (err) {
      console.warn('Fallback decode', err);

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            if (!ctx) return reject('Canvas error');

            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg', 0.9));
          };
          img.onerror = () => reject('Image load error');
          img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  onScrollUp(event: any) {
    const el = event.target as HTMLElement;
    if (el.scrollTop <= 20 && !this.loading && !this.allLoaded) {
      this.loadOlderMessages();
    }
  }

  private scrollToBottom() {
    const box = this.scrollMe?.nativeElement;
    if (!box) return;
    requestAnimationFrame(() => {
      box.scrollTop = box.scrollHeight;
      requestAnimationFrame(() => (box.scrollTop = box.scrollHeight));
    });
  }

  private scrollToTop() {
    const box = this.scrollMe?.nativeElement;
    if (!box) return;
    requestAnimationFrame(() => {
      box.scrollTop = 0;
      requestAnimationFrame(() => (box.scrollTop = 0));
    });
  }

  private async initialLoad() {
    this.skip = 0;
    this.allLoaded = false;
    this.messageList = [];

    await this.fetchPage(true);

    setTimeout(() => this.scrollToBottom(), 0);

    this.subs.add(
      this.chatroomService.markRead(this.chatId).subscribe({
        error: (error) => console.error('Failed to mark messages as read:', error),
      })
    );
  }

  private loadOlderMessages() {
    if (this.loading || this.allLoaded) return;
    this.fetchPage(false);
  }

  deleteMessage(event: any) {
    if (event === 'deleteChat') {
      const id = this.chatId;
      if (!id) return;
      this.subs.add(
        this.chatroomService.deleteChatRoom(id).subscribe({
          next: (res) => {
            if (res?.isSuccess) {
              this.router.navigate(['/chat']);
            } else {
              console.error('Failed to delete chatroom:', (res as any)?.errorMessage);
            }
          },
          error: (err) => console.error('Delete chatroom error:', err),
        })
      );
    }
  }

  private fetchPage(isFirstLoad: boolean) {
    this.loading = true;

    this.subs.add(
      this.chatroomService.getHistoryPaged(this.chatId, this.skip, this.take).subscribe({
        next: (res) => {
          if (!res?.isSuccess) {
            this.loading = false;
            return;
          }

          const pageDesc: any[] = res.data?.messages || [];
          const totalCount: number | undefined = res.data?.totalCount;

          if (pageDesc.length === 0) {
            this.allLoaded = true;
            this.loading = false;
            return;
          }

          const page = [...pageDesc].reverse();

          if (isFirstLoad) {
            this.messageList = page;
            for (const m of page) {
              const id: number | undefined = (m as any).messageID ?? (m as any).id;
              if (id) this.seenMessageIds.add(id);
            }
          } else {
            const box = this.scrollMe?.nativeElement;
            const prevScrollHeight = box?.scrollHeight || 0;

            const unique = page.filter((m) => {
              const id: number | undefined = (m as any).messageID ?? (m as any).id;
              if (!id) return true;
              if (this.seenMessageIds.has(id)) return false;
              this.seenMessageIds.add(id);
              return true;
            });

            this.messageList = [...unique, ...this.messageList];

            setTimeout(() => {
              if (!box) return;
              const newScrollHeight = box.scrollHeight;
              box.scrollTop = newScrollHeight - prevScrollHeight;
            }, 0);
          }

          this.skip += page.length;
          if (typeof totalCount === 'number' && this.skip >= totalCount) {
            this.allLoaded = true;
          }

          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
        },
      })
    );
  }
}
