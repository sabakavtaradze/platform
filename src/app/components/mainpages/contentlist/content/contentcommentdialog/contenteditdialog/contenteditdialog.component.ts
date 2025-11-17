import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminPostsService } from 'src/app/admin/services/admin-posts.service';
import { APIService } from 'src/app/API.service';
import { AuthenticatedUser, UserAttributes } from 'src/app/interfaces/authentication/user';
import { PostService } from 'src/app/services/post/post.service';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { v4 as uuidv4 } from 'uuid';

interface EditPostInput {
  id: string;
  text: string | null;
  userid: string | null;
  images: string[] | null;
}

@Component({
  selector: 'app-contenteditdialog',
  templateUrl: './contenteditdialog.component.html',
  styleUrls: ['./contenteditdialog.component.scss'],
  standalone: false
})
export class ContenteditdialogComponent implements OnInit {

  postid: any;
  content: any;
  contentText: string = ""
  dataa: any;
  currentUser: UserAttributes | null = null;
  contentForm: FormGroup;
  isDisabled: boolean = false;
  files!: FileList
  filesUpdate!: FileList
  imageprewsForRemove: any[] = [];
  fileRemoved: any;
  imageprewsDifference: any[] = [];
  imageprews: any[] = [];
  imageprews1: any[] = [];
  private adminMode: boolean = false;


  constructor(
    private authService: AuthenticationService,
    public dialogRef: MatDialogRef<ContenteditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiservice: APIService,
    private fb: FormBuilder,
    private postService: PostService,
    private adminPosts: AdminPostsService
  ) {
    this.content = data.content
    this.adminMode = !!data?.admin;
    this.contentText = data.content.text
    this.contentForm = this.fb.group({
      text: ['', []],
    });
  }

  ngOnInit() {
    this.auth()
    this.dataInit()
    console.log(this.content)
  }

  dataInit() {
    this.contentForm.get('text')?.setValue(this.content.postText);
    this.imageProcess(this.content)
  }

  imageProcess(message: any): void {
    if (message.postImages) {
      message.postImages.forEach((el: string) => {
        this.imageprewsDifference.push(el);
        this.imageprews1.push(el);
        this.imageprews.push(el);
      });
    }
  }

  removeImg(image: string) {
    this.imageprews = this.imageprews.filter(x => x !== image);
    this.imageprews1 = this.imageprews1.filter(x => x !== image);

    this.imageprewsForRemove = this.imageprewsForRemove.filter(x => x.readerResult !== image);
    const dataTransfer = new DataTransfer();
    this.imageprewsForRemove.forEach((x: any) => dataTransfer.items.add(x.file));
    this.filesUpdate = dataTransfer.files;
  }

  async auth() {
    try {
      const user: AuthenticatedUser | null = await this.authService.GuardUserAuth()
      if (user && user.attributes) {
        this.currentUser = user.attributes
      } else {
        this.currentUser = null;
        this.isDisabled = true;
      }
    } catch (error) {
      this.currentUser = null;
      this.isDisabled = true;
    }
  }

  Done() {
    if (!this.currentUser?.sub) return;
    this.editPost(); // <-- no argument now
  }

  editPost(newImgs: string[] | null = null) {   // <-- FIXED signature
    if (!this.currentUser?.sub) return;

    const postId = Number(this.content.postID);
    const postText = this.contentForm.value.text ?? '';
    const existingImages = this.imageprews1 ?? [];

    let newFiles: FileList | undefined;
    if (this.filesUpdate?.length > 0) newFiles = this.filesUpdate;
    else if (this.files?.length > 0) newFiles = this.files;

    if (!postText && existingImages.length == 0 && !newFiles) {
      return;
    }

    this.isDisabled = true;

    const svc = this.adminMode ? this.adminPosts : this.postService;
    svc.updatePost(postId as any, postText as any, existingImages as any, newFiles as any)
      .subscribe({
        next: (res) => {

          this.isDisabled = false;

          // return new data to parent
          this.dialogRef.close({
            updated: true,
            newText: postText,
            newImages: existingImages
          });
        },
        error: (err) => {
          this.isDisabled = false;
        }
      });
  }

  onFileSelected(event: any) {
    const selected = event.target.files;
    this.addFilesToUpdate(selected);
  }

  addFilesToUpdate(files: FileList) {
    const dataTransfer = new DataTransfer();

    if (this.filesUpdate?.length > 0) {
      Array.from(this.filesUpdate).forEach(f => dataTransfer.items.add(f));
    }

    Array.from(files).forEach(f => dataTransfer.items.add(f));

    this.filesUpdate = dataTransfer.files;

    this.previewSelected(files);
  }

  previewSelected(files: FileList) {
    const arr = Array.from(files);
    arr.forEach(file => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = _event => {
        this.imageprews.push(reader.result);
        this.imageprewsForRemove.push({ file, readerResult: reader.result })
      };
    });
  }

  // preview() {
  //   const filesArray = Array.from(this.files);
  //   for (const file of filesArray) {
  //     let reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = _event => {
  //       this.imageprews.push(reader.result);
  //       this.imageprewsForRemove.push({ file, readerResult: reader.result })
  //     };
  //   }
  // }

  readAsDataURL(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject('Error reading file');
      };
      reader.readAsDataURL(file);
    });
  }

  async uploadImage(files: FileList) {
    let imgs: string[] = [];
    if (!this.currentUser?.sub) {
      this.isDisabled = false;
      return;
    }

    const filesArray = Array.from(files);
    for (const file of filesArray) {
      try {
        const uniqueKey = `${this.currentUser.sub}/${uuidv4()}-${file.name}`;
        imgs.push(uniqueKey);

      } catch (uploadError) {
        this.isDisabled = false;
        return;
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}
