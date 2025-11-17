import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { ContentcommentdialogComponent } from 'src/app/components/mainpages/contentlist/content/contentcommentdialog/contentcommentdialog.component';
import { ContenteditdialogComponent } from 'src/app/components/mainpages/contentlist/content/contentcommentdialog/contenteditdialog/contenteditdialog.component';
import { ContentzoomdialogComponent } from 'src/app/components/mainpages/contentlist/content/contentzoomdialog/contentzoomdialog.component';
import { AuthenticatedUser, UserAttributes } from 'src/app/interfaces/authentication/user';
import { PostCommentService } from 'src/app/services/post/post-comment.service';
import { PostLikeService } from 'src/app/services/post/post-like.service';
import { PostService } from 'src/app/services/post/post.service';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { SharedmoduleModule } from "../../../components/sharedmodule/sharedmodule.module";
import { AdminPostsService } from '../../services/admin-posts.service';

@Component({
  selector: 'app-admin-posts',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    SharedmoduleModule,
  ],
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.scss'],
})
export class AdminPostsComponent {
  @Input() postId: number = 0;
  @Output() onDeletePost = new EventEmitter<number>();

  content: any;
  profilePicture: string = '';
  currentUser: UserAttributes | null = null;
  postOwner: boolean = false;
  loading: boolean = false;
  textHidden: boolean = true;
  isAdmin: boolean = false;

  accessLike: boolean = false;
  alreadyLiked: boolean = false;
  contentLikes: number = 0;
  commentCount: number = 0;
  constructor(
    private authService: AuthenticationService,
    private postService: PostService,
    private adminPosts: AdminPostsService,
    public dialog: MatDialog,
    private userService: UserService,
    private postLikeService: PostLikeService,
    private postcommentService: PostCommentService
  ) { }

  ngOnInit() {
    this.auth();
    this.loadPost(this.postId);
  }

  ngOnDestroy(): void { }

  loadPost(id: number) {
    this.postService.getPostById(id).subscribe((res) => {
      this.content = res.data;
      console.log(res.data);
      this.checkOwner();
      this.loadProfilePicture();
      this.getLikesCount();
      this.doesIlikePost();
      console.log(this.profilePicture);
      console.log(this.postOwner);
      this.getCommentCount();
    });
  }

  checkOwner() {
    if (!this.currentUser || !this.content) return;
    if (this.content.postOwner.userID == Number(this.currentUser.sub)) {
      this.postOwner = true;
    }
  }

  loadProfilePicture() {
    this.userService.getProfilePicture(this.content.postOwner.userID).subscribe((res) => {
      this.profilePicture = res.data;
      console.log(this.content.postOwner.userID);
      console.log(res.data);
    });
  }

  async auth() {
    const user: AuthenticatedUser | null = await this.authService.GuardUserAuth();
    this.currentUser = user?.attributes || null;
    try {
      this.isAdmin = this.authService.isAdmin();
    } catch {
      this.isAdmin = false;
    }
  }

  openComments(): void {
    console.log(this.content);

    this.dialog.open(ContentcommentdialogComponent, {
      data: { content: this.content },
      width: '100%',
    });
  }

  openImageDialog(image: any): void {
    this.dialog.open(ContentzoomdialogComponent, {
      panelClass: 'full-width-dialog',
      data: { image },
    });
  }

  textSeemore() {
    this.textHidden = !this.textHidden;
  }

  editPost() {
    const ref = this.dialog.open(ContenteditdialogComponent, {
      data: { content: this.content, admin: true },
      width: '100%',
    });

    ref.afterClosed().subscribe((result) => {
      if (result?.updated) {
        // refresh complete post from backend including images
        this.loadPost(this.postId);
      }
    });
  }

  async deletePost() {
    if (!confirm('Are you sure you want to delete this post?')) return;

    this.loading = true;
    try {
      await this.adminPosts.deletePost(this.content.postID).toPromise();
      this.loading = false;
      this.onDeletePost.emit(this.content.postID);
    } catch (error) {
      console.error(error);
      this.loading = false;
    }
  }
  toggleLike() {
    this.alreadyLiked = !this.alreadyLiked;
    this.postLikeService.toggleLike(this.content.postID).subscribe((res) => {
      if (res?.isSuccess) {
        this.doesIlikePost();
        console.log(res);
      }
      this.getLikesCount();
    });
  }
  getLikesCount() {
    this.postLikeService.getLikesCount(this.content.postID).subscribe((res) => {
      console.log(this.alreadyLiked);
      console.log(this.contentLikes);
      this.contentLikes = res.data;
    });
  }
  doesIlikePost() {
    this.postLikeService.userLiked(this.content.postID).subscribe((res) => {
      this.alreadyLiked = res.data;
      console.log(this.alreadyLiked);
    });
  }

  handleImageError() {
    this.profilePicture = '';
  }
  getCommentCount() {
    this.postcommentService.getCommentCount(this.content.postID).subscribe((res) => {
      console.log(res);
      this.commentCount = res.data;
      // console.log(this.alreadyLiked);
      // console.log(this.contentLikes)
      // this.contentLikes = res.data;
    });
  }
}
