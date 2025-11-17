import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import heic2any from 'heic2any'; // ✅ ADDED
import { AuthenticatedUser, UserAttributes } from 'src/app/interfaces/authentication/user';
import { PostService } from 'src/app/services/post/post.service';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { CreatecontentComponent } from '../createcontent.component';

@Component({
    selector: 'app-createcontentdialog',
    templateUrl: './createcontentdialog.component.html',
    styleUrls: ['./createcontentdialog.component.scss'],
    standalone: false
})
export class CreatecontentdialogComponent implements OnInit {
  currentUser: UserAttributes | null = null;
  files!: FileList;
  filesUpdate!: FileList;
  contentForm: FormGroup;
  isDisabled = false;
  loading = false;

  imageprews: any[] = [];
  imageprewsForRemove: any[] = [];

  constructor(
    private authService: AuthenticationService,
    public dialogRef: MatDialogRef<CreatecontentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postService: PostService,
    private fb: FormBuilder
  ) {
    this.contentForm = this.fb.group({
      text: [''],
    });
  }

  ngOnInit() {
    this.auth();
  }

  async auth() {
    try {
      const user: AuthenticatedUser | null = await this.authService.GuardUserAuth();
      if (user && user.attributes) {
        this.currentUser = user.attributes;
      } else {
        this.currentUser = null;
        this.isDisabled = true;
      }
    } catch (error) {
      this.isDisabled = true;
    }
  }

  Done() {
    if (!this.currentUser || !this.currentUser.sub) {
      alert('Authentication failed. Please log in again.');
      this.dialogRef.close();
      return;
    }

    const postText = this.contentForm.value.text?.trim() || '';
    const filesToUse = this.filesUpdate || this.files;
    const hasFiles = !!filesToUse && filesToUse.length > 0;

    if (!hasFiles && postText.length === 0) {
      alert('Text is required when no images are selected.');
      return;
    }

    this.loading = true;
    this.isDisabled = true;

    this.postService.createPost(postText, filesToUse).subscribe({
      next: (res) => {
        console.log('UPLOAD RESULT:', res);
        alert('Post created successfully!');
        this.dialogRef.close(true);

        this.loading = false;
        this.isDisabled = false;
      },

      error: (error) => {
        console.error('UPLOAD ERROR:', error);

        if (error.status === 400 && error.error?.errors?.PostText) {
          alert(error.error.errors.PostText[0]);
        } else {
          alert('Failed to create post.');
        }

        this.loading = false;
        this.isDisabled = false;
      },
    });
  }

  /** ---------- File Select ---------- */
  onFileSelected(event: any) {
    const newFiles = event.target.files;

    if (this.filesUpdate) {
      const allFiles = [...Array.from(this.filesUpdate), ...Array.from(newFiles)];
      const dataTransfer = new DataTransfer();
      allFiles.forEach((f) => dataTransfer.items.add(f as File));
      this.filesUpdate = dataTransfer.files;
      this.files = dataTransfer.files;
    } else {
      this.files = newFiles;
      this.filesUpdate = newFiles;
    }

    this.preview(newFiles);
  }

  /** ---------- CAN POST (for template binding if needed) ---------- */
  canPost(): boolean {
    const postText = this.contentForm.value.text?.trim() || '';
    const filesToUse = this.filesUpdate || this.files;
    const hasFiles = !!filesToUse && filesToUse.length > 0;
    return hasFiles || postText.length > 0; // images make text optional
  }

  /** ---------- FIXED PREVIEW (safe for HEIC) ---------- */
  async preview(filesToPreview: FileList) {
    const filesArray = Array.from(filesToPreview);

    const dataTransfer = new DataTransfer(); // HERE: will store converted files

    for (const file of filesArray) {
      const jpegBase64 = await this.convertToJpegBase64(file);

      // Convert base64 → Blob → File (so backend gets correct file)
      const jpegBlob = await (await fetch(jpegBase64)).blob();
      const jpegFile = new File([jpegBlob], `${file.name}.jpg`, { type: 'image/jpeg' });

      // Save new file into upload list
      dataTransfer.items.add(jpegFile);

      // Save preview
      this.imageprews.push(jpegBase64);
      this.imageprewsForRemove.push({ file: jpegFile, readerResult: jpegBase64 });
    }

    // Replace original file list with converted JPEG files
    this.files = dataTransfer.files;
    this.filesUpdate = dataTransfer.files;
  }

  /** ---------- REMOVE PREVIEW ---------- */
  removeImg(image: any) {
    this.imageprewsForRemove = this.imageprewsForRemove.filter((e) => e.readerResult !== image);
    this.imageprews = this.imageprews.filter((e) => e !== image);

    const dt = new DataTransfer();
    this.imageprewsForRemove.forEach((f) => dt.items.add(f.file));
    this.files = dt.files;
    this.filesUpdate = dt.files;
  }

  /** ---------- HEIC SAFE CONVERTER ---------- */
  private async convertToJpegBase64(file: File): Promise<string> {
    try {
      // HEIC/HEIF → JPEG
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

      // Normal images → convert through canvas
      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas missing');

      ctx.drawImage(bitmap, 0, 0);

      return canvas.toDataURL('image/jpeg', 0.9);
    } catch (err) {
      console.warn('Fallback convert used', err);

      // Fallback
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
