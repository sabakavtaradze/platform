import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import heic2any from 'heic2any';
import { APIService } from 'src/app/API.service';
import { PostCommentService } from 'src/app/services/post/post-comment.service';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';

@Component({
    selector: 'app-contentcommentdialog',
    templateUrl: './contentcommentdialog.component.html',
    styleUrls: ['./contentcommentdialog.component.scss'],
    standalone: false
})
export class ContentcommentdialogComponent implements OnInit, OnDestroy {
  post: any;
  currentUser: any;
  content: any;
  contentForm: FormGroup;

  selectedFile: File | null = null;
  imageprew: string | undefined;

  isDisabled: boolean = false;
  updateUser: any;
  comments: any;

  constructor(
    private fb: FormBuilder,
    private postCommentService: PostCommentService,
    public dialogRef: MatDialogRef<ContentcommentdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authguard: AuthenticationService,
    private apiservice: APIService
  ) {
    this.currentUser = data.currentUser;
    this.content = data.content;

    this.contentForm = this.fb.group({
      text: ['', []],
    });
  }

  ngOnInit(): void {
    this.auth();
    console.log(this.content);
  }

  ngOnDestroy(): void {
    if (this.updateUser) this.updateUser.unsubscribe();
  }

  async getComment() {
    try {
      const postId = this.content?.postID;
      if (!postId) return;

      this.postCommentService.getCommentsByPostID(postId).subscribe({
        next: (response: any) => {
          if (response.isSuccess) {
            this.comments = response.data;
            if (this.comments?.length > 0) {
              this.comments.sort((a: any, b: any) => (a.createdAt > b.createdAt ? -1 : 1));
            }
          } else {
            console.error('Failed to load comments', response.errorMessage);
            this.comments = [];
          }
        },
        error: () => (this.comments = []),
      });
    } catch (error) {
      console.error(error);
    }
  }

  removeImg() {
    this.selectedFile = null;
    this.imageprew = undefined;

    const fileInput = document.querySelector('input[type=file]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  async onFileSelected(event: any): Promise<void> {
    const fileList: FileList = event.target.files;
    if (!fileList || fileList.length === 0) {
      this.selectedFile = null;
      this.imageprew = undefined;
      return;
    }

    const originalFile = fileList[0];

    try {
      const jpegBase64 = await this.convertToJpegBase64(originalFile);
      this.imageprew = jpegBase64;

      const jpegBlob = await (await fetch(jpegBase64)).blob();
      const jpegFile = new File([jpegBlob], `${originalFile.name}.jpg`, { type: 'image/jpeg' });

      this.selectedFile = jpegFile;
    } catch (err) {
      console.error('Image conversion failed:', err);
      this.selectedFile = null;
      this.imageprew = undefined;
    }
  }

  private async convertToJpegBase64(file: File): Promise<string> {
    try {
      if (
        file.type.includes('heic') ||
        file.name.toLowerCase().endsWith('.heic') ||
        file.type.includes('heif')
      ) {
        const jpegBlob = (await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.9,
        })) as Blob;
        return await this.blobToBase64(jpegBlob);
      }

      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas error');

      ctx.drawImage(bitmap, 0, 0);

      return canvas.toDataURL('image/jpeg', 0.9);
    } catch (err) {
      console.warn('Fallback convert used', err);

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
          img.onerror = reject;
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

  async Done() {
    this.isDisabled = true;
    const text = this.contentForm.value.text || ''; // ✅ ALWAYS SEND STRING
    const postId = this.content?.postID;

    if (!postId || (!text && !this.selectedFile)) {
      this.isDisabled = false;
      return;
    }

    const formData = new FormData();
    formData.append('PostID', postId.toString());

    // ✅ ALWAYS append CommentText (even empty)
    formData.append('CommentText', text);

    if (this.selectedFile) formData.append('File', this.selectedFile);

    this.createComment(formData);
  }

  createComment(formData: FormData) {
    this.postCommentService.createCommentFormData(formData).subscribe({
      next: () => {
        this.isDisabled = false;
        this.contentForm.reset();
        this.imageprew = undefined;
        this.selectedFile = null;
        this.getComment();
      },
      error: (err) => {
        console.error('Comment creation failed:', err);
        this.isDisabled = false;
      },
    });
  }

  canPost(): boolean {
    const text = (this.contentForm.value.text || '').trim();
    const hasImage = !!this.selectedFile;
    return hasImage || text.length > 0;
  }

  async auth() {
    try {
      this.currentUser = await this.authguard.GuardUserAuth();
      return (this.getComment(), this.updateUserFunction());
    } catch (error) {
      console.error('Authentication error:', error);
    }
  }

  async updateUserFunction() {
    let filter = { id: { eq: this.currentUser.attributes.sub } };
    try {
    } catch (error) {}
  }
}
