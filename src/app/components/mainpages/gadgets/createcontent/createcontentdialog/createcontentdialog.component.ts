import { Component, Inject, OnInit } from '@angular/core';
import { CreatecontentComponent } from '../createcontent.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post/post.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { AuthenticatedUser, UserAttributes } from 'src/app/interfaces/authentication/user';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-createcontentdialog',
  templateUrl: './createcontentdialog.component.html',
  styleUrls: ['./createcontentdialog.component.scss']
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
    // ✅ formControlName must match your HTML
    this.contentForm = this.fb.group({
      text: ['']
    });
  }

  ngOnInit() {
    this.auth();
  }

  /** ✅ Verify current user */
  async auth() {
    try {
      const user: AuthenticatedUser | null = await this.authService.GuardUserAuth();
      if (user && user.attributes) {
        this.currentUser = user.attributes;
        console.log('✅ Authenticated user:', this.currentUser);
      } else {
        this.currentUser = null;
        this.isDisabled = true;
      }
    } catch (error) {
      console.error('❌ Auth check failed:', error);
      this.isDisabled = true;
    }
  }

  /** ✅ Create new post */
  async Done() {
    if (!this.currentUser || !this.currentUser.sub) {
      alert('Authentication failed. Please log in again.');
      this.dialogRef.close();
      return;
    }

    const postText = this.contentForm.value.text?.trim() || '';
    const filesToUse = this.filesUpdate || this.files;
    const hasFiles = filesToUse && filesToUse.length > 0;

    if (!postText && !hasFiles) {
      alert('Please add text or image.');
      return;
    }

    this.loading = true;
    this.isDisabled = true;

    try {
      // ✅ Use PostService helper (expects text + files)
      const result = await firstValueFrom(
        this.postService.createPost(postText, filesToUse)
      );

      console.log('✅ Post created successfully:', result);
      alert('Post created successfully!');
      this.dialogRef.close(true);
    } catch (error: any) {
      console.error('❌ Error creating post:', error);
      if (error.status === 400 && error.error?.errors?.PostText) {
        alert('Server validation: ' + error.error.errors.PostText[0]);
      } else if (error.status === 403) {
        alert('Access denied (403). Check your login.');
      } else {
        alert('Failed to create post. Try again.');
      }
    } finally {
      this.isDisabled = false;
      this.loading = false;
    }
  }

  /** ✅ File selection & preview handler */
  onFileSelected(event: any) {
    const newFiles = event.target.files;

    if (this.filesUpdate) {
      const allFiles = [...Array.from(this.filesUpdate), ...Array.from(newFiles)];
      const dataTransfer = new DataTransfer();
      allFiles.forEach(f => dataTransfer.items.add(f as File));
      this.filesUpdate = dataTransfer.files;
      this.files = dataTransfer.files;
    } else {
      this.files = newFiles;
      this.filesUpdate = newFiles;
    }

    this.preview(newFiles);
  }

  /** ✅ Preview selected images */
  preview(filesToPreview: FileList) {
    const filesArray = Array.from(filesToPreview);
    for (const file of filesArray) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = _ => {
        this.imageprewsForRemove.push({ file, readerResult: reader.result });
        this.imageprews.push(reader.result);
      };
    }
  }

  /** ✅ Remove a specific image before upload */
  removeImg(image: any) {
    this.imageprewsForRemove = this.imageprewsForRemove.filter(e => e.readerResult !== image);
    this.imageprews = this.imageprews.filter(e => e !== image);

    const dt = new DataTransfer();
    this.imageprewsForRemove.forEach(f => dt.items.add(f.file));
    this.files = dt.files;
    this.filesUpdate = dt.files;
  }

  /** ✅ Close dialog */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
