import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { APIServicem } from 'src/app/apiservicem';
import { PostService } from 'src/app/services/post/post.service';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { ChatroomService } from 'src/app/services/user/chatroom/chatroom.service';
import { FriendshipService } from 'src/app/services/user/friendship/friendship.service';
import { UserService } from 'src/app/services/user/user.service';

import { ContentphotodialogComponent } from '../../contentlist/content/contentphotodialog/contentphotodialog.component';

import { AuthenticatedUser, UserAttributes } from 'src/app/interfaces/authentication/user';

import { Subscription } from 'rxjs';
import { BaseResponse } from 'src/app/interfaces/ResponseInterface/BaseResponse';

import heic2any from 'heic2any'; // ✅ ADDED

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: false
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser: UserAttributes | null = null;

  profileId!: number;
  profileUser: any = null;
  profileOwner = false;

  profilePicture = '';
  cover = '';
  profileImages: string[] = [];

  imageprew: string | null = null;
  uploadingProfileImage = false;
  uploadingCoverImage = false;

  userIsFollowing = false;
  FollowersCount = 0;

  process = false;

  private subs = new Subscription();

  constructor(
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private apiservicem: APIServicem,
    private friendshipService: FriendshipService,
    private userService: UserService,
    private postService: PostService,
    private chatroomService: ChatroomService
  ) { }

  ngOnInit(): void {
    this.subs.add(
      this.activeRoute.paramMap.subscribe((params: ParamMap) => {
        const pid = params.get('profileId');
        this.profileId = Number(pid ?? 0);
        this.auth();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadFollowersCount() {
    if (!this.profileId) return;

    this.subs.add(
      this.friendshipService
        .getFollowersCount(this.profileId)
        .subscribe((res: BaseResponse<number>) => {
          if (res?.isSuccess) this.FollowersCount = res.data;
        })
    );
  }

  GetIsFollowing() {
    if (!this.profileId) return;

    this.subs.add(
      this.friendshipService
        .getIsFollowing(this.profileId)
        .subscribe((res: BaseResponse<boolean>) => {
          if (res?.isSuccess) this.userIsFollowing = !!res.data;
        })
    );
  }

  async UnfollowUser(profileUser: any) {
    if (!profileUser?.userID) return;
    this.userIsFollowing = false;
    this.process = true;
    this.subs.add(
      this.friendshipService.unfollowUser(profileUser.userID).subscribe({
        next: () => {
          this.GetIsFollowing();
          this.loadFollowersCount();
        },
        error: (err) => console.error(err),
        complete: () => (this.process = false),
      })
    );
  }

  FollowUser(profileUser: any) {
    if (!profileUser?.userID) return;
    this.userIsFollowing = true;
    this.process = true;
    this.subs.add(
      this.friendshipService.followUser(profileUser.userID).subscribe({
        next: () => {
          this.GetIsFollowing();
          this.loadFollowersCount();
        },
        error: (err) => console.error(err),
        complete: () => (this.process = false),
      })
    );
  }

  openImageDialog(post: any): void {
    const dialogRef = this.dialog.open(ContentphotodialogComponent, {
      panelClass: 'full-width-dialog',
      data: { image: post },
    });

    this.subs.add(dialogRef.afterClosed().subscribe(() => { }));
  }

  async getUser() {
    try {
      this.profileOwner =
        !!this.currentUser && Number(this.currentUser.sub) === Number(this.profileId);

      this.loadFollowersCount();
      if (this.currentUser) this.GetIsFollowing();

      this.subs.add(
        this.userService.getUserById(this.profileId).subscribe((res: BaseResponse<any>) => {
          this.profileUser = res?.data ?? null;
          console.log(this.profileUser)
          if (!this.profileUser) return;

          if (this.profileOwner) {
            this.subs.add(
              this.userService.getOwnProfilePicture().subscribe((r: BaseResponse<string>) => {
                if (r?.isSuccess) this.profilePicture = r.data;
              })
            );
            this.subs.add(
              this.userService.getCoverPicture().subscribe((r: BaseResponse<string>) => {
                if (r?.isSuccess) this.cover = r.data;
              })
            );
          } else {
            this.subs.add(
              this.userService
                .getProfilePicture(this.profileId)
                .subscribe((r: BaseResponse<string>) => {
                  if (r?.isSuccess) this.profilePicture = r.data;
                })
            );
            this.subs.add(
              this.userService
                .getCoverPictureById(this.profileId)
                .subscribe((r: BaseResponse<string>) => {
                  if (r?.isSuccess) this.cover = r.data;
                })
            );
          }

          this.loadPhotos();
        })
      );
    } catch (err) {
      console.error(err);
    }
  }

  loadPhotos() {
    this.subs.add(
      this.postService.getAllPosts().subscribe((p: BaseResponse<any[]>) => {
        const all = p?.data ?? [];
        const userPosts = all.filter((x: any) => Number(x.userId) === Number(this.profileId));
        this.profileImages = userPosts.flatMap((x: any) => x.imageUrls ?? []);
      })
    );
  }

  async auth() {
    try {
      const currentuser: AuthenticatedUser | null = await this.authService.GuardUserAuth();

      if (currentuser && currentuser.attributes) {
        this.currentUser = currentuser.attributes;
        this.getUser();
      } else {
        this.currentUser = null;
        this.getUser();
      }
    } catch (error) {
      console.error('Auth failed:', error);
      this.currentUser = null;
      this.getUser();
    }
  }

  // ───────────────────────────────────────────────
  // FIXED HEIC-SAFE UPLOAD
  // ───────────────────────────────────────────────
  async onFileSelected(event: any, choice: boolean): Promise<void> {
    const list: FileList | null = event?.target?.files || null;
    const file: File | undefined = list && list.length > 0 ? list[0] : undefined;
    if (!file) return;

    // Convert → JPEG base64
    const jpegBase64 = await this.convertToJpegBase64(file);
    if (choice === false) {
      this.profilePicture = jpegBase64;
      this.uploadingProfileImage = true;
    } else {
      this.cover = jpegBase64;
      this.uploadingCoverImage = true;
    }

    // Convert base64 → real file
    const jpegBlob = await (await fetch(jpegBase64)).blob();
    const jpegFile = new File([jpegBlob], `${file.name}.jpg`, { type: 'image/jpeg' });

    this.uploadSingleImage(jpegFile, choice);
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

  private uploadSingleImage(file: File, choice: boolean) {
    if (!file) return;

    const uploadObservable = choice === false
      ? this.userService.updateProfilePicture(file)
      : this.userService.updateCoverPicture(file);

    this.subs.add(
      uploadObservable.subscribe({
        next: () => this.getUser(),
        error: (e) => {
          console.error(e);
          this.clearUploadFlag(choice);
        },
        complete: () => {
          this.clearUploadFlag(choice);
        },
      })
    );
  }

  private clearUploadFlag(choice: boolean): void {
    if (choice === false) {
      this.uploadingProfileImage = false;
    } else {
      this.uploadingCoverImage = false;
    }
  }

  editProfilePicture(imgs: any) {
    if (!this.currentUser?.sub) return;

    const editProfile = {
      id: this.currentUser.sub,
      profilepicture: imgs?.[0] ?? null,
    };

    if (this.profileUser?.profilepicture) {
      console.log('[TODO] Remove old profile picture:', this.profileUser.profilepicture);
    }
  }

  editCoverPicture(imgs: any) {
    if (!this.currentUser?.sub) return;

    const editProfile = {
      id: this.currentUser.sub,
      cover: imgs?.[0] ?? null,
    };

    if (this.profileUser?.cover) {
      console.log('[TODO] Remove old cover picture:', this.profileUser.cover);
    }

  }

  messageUser() {
    if (!this.currentUser?.sub) return;

    const otherId = Number(this.profileId);
    this.subs.add(
      this.chatroomService.openOrCreateRoom(otherId).subscribe((res: any) => {
        if (res?.isSuccess && res?.data) {
          this.router.navigate(['/chat/chatroom/' + res.data]);
        } else {
          console.error(res?.errorMessage || 'Unable to open chatroom.');
        }
      })
    );
  }

  async updateUserFunction() {
    if (!this.currentUser?.sub) return;
  }
}
