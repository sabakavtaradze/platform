import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { APIService } from 'src/app/API.service';
import { APIServicem } from 'src/app/apiservicem';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { FriendshipService } from 'src/app/services/user/friendship/friendship.service';
import { UserService } from 'src/app/services/user/user.service';
import { PostService } from 'src/app/services/post/post.service';
import { ChatroomService } from 'src/app/services/user/chatroom/chatroom.service';

import { ContentphotodialogComponent } from '../../contentlist/content/contentphotodialog/contentphotodialog.component';

import {
  AuthenticatedUser,
  UserAttributes,
} from 'src/app/interfaces/authentication/user';

import {BaseResponse} from 'src/app/interfaces/ResponseInterface/BaseResponse';
import { Subscription } from 'rxjs';

// ⚠️ If you use the npm uuid package, switch to:
// import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require('uuid');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser: UserAttributes | null = null;

  profileId!: number;                // route param (number)
  profileUser: any = null;           // backend user DTO
  profileOwner = false;

  profilePicture = '';
  cover = '';
  profileImages: string[] = [];

  imageprew: any;
  files!: FileList;

  userIsFollowing = false;           // ← state for follow button
  FollowersCount = 0;

  process = false;                   // your flag (left as-is)

  s3BucketUrl =
    'https://platform-storage-ea64737a135009-staging.s3.amazonaws.com/public/';

  private subs = new Subscription();

  constructor(
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private apiservice: APIService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private apiservicem: APIServicem,
    private friendshipService: FriendshipService,
    private userService: UserService,
    private postService: PostService,
    private chatroomService: ChatroomService
  ) {}

  // ────────────────────────────────────────────────────────────────────────────
  // Lifecycle
  // ────────────────────────────────────────────────────────────────────────────
  ngOnInit(): void {
    // react to route changes
    this.subs.add(
      this.activeRoute.paramMap.subscribe((params: ParamMap) => {
        const pid = params.get('profileId');
        this.profileId = Number(pid ?? 0);

        // authenticate, then load profile
        this.auth();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Counters / Following State
  // ────────────────────────────────────────────────────────────────────────────

  loadFollowersCount() {
    // Count is based on the *profile being viewed*, not the logged-in user
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
    // Check if *logged-in user* follows the *profile user*
    if (!this.profileId) return;

    this.subs.add(
      this.friendshipService
        .getIsFollowing(this.profileId)
        .subscribe((res: BaseResponse<boolean>) => {
          if (res?.isSuccess) {
            this.userIsFollowing = !!res.data;
          }
        })
    );
  }

  // Keep original names
  async UnfollowUser(profileUser: any) {
    if (!profileUser?.userID) return;

    this.process = true;
    this.subs.add(
      this.friendshipService.unfollowUser(profileUser.userID).subscribe({
        next: (res: BaseResponse<boolean>) => {
          // refresh state
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

    this.process = true;
    this.subs.add(
      this.friendshipService.followUser(profileUser.userID).subscribe({
        next: (res: BaseResponse<boolean>) => {
          // refresh state
          this.GetIsFollowing();
          this.loadFollowersCount();
          console.log(res);
        },
        error: (err) => console.error(err),
        complete: () => (this.process = false),
      })
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Media / Dialog
  // ────────────────────────────────────────────────────────────────────────────
  openImageDialog(post: any): void {
    const dialogRef = this.dialog.open(ContentphotodialogComponent, {
      panelClass: 'full-width-dialog',
      data: { image: post },
    });

    this.subs.add(dialogRef.afterClosed().subscribe(() => {}));
  }

  // ────────────────────────────────────────────────────────────────────────────
  // User Loading
  // ────────────────────────────────────────────────────────────────────────────
  async getUser() {
    try {
      // Determine if viewed profile is the owner (only when logged in)
      this.profileOwner =
        !!this.currentUser &&
        Number(this.currentUser.sub) === Number(this.profileId);

      // Always load counters and following visibility (following needs auth; this method just triggers)
      this.loadFollowersCount();
      if (this.currentUser) this.GetIsFollowing();

      // Load profile details
      this.subs.add(
        this.userService.getUserById(this.profileId).subscribe((res: BaseResponse<any>) => {
          this.profileUser = res?.data ?? null;
          if (!this.profileUser) return;

          // Profile and cover images:
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
              this.userService.getProfilePicture(this.profileId).subscribe((r: BaseResponse<string>) => {
                if (r?.isSuccess) this.profilePicture = r.data;
              })
            );
            this.subs.add(
              this.userService.getCoverPictureById(this.profileId).subscribe((r: BaseResponse<string>) => {
                if (r?.isSuccess) this.cover = r.data;
              })
            );
          }

          // Load photos after we have the profile id
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

  // (kept for parity; now implemented through GetIsFollowing above)
  async checkFollowing() {
    if (!this.currentUser) return;
    this.GetIsFollowing();
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Auth
  // ────────────────────────────────────────────────────────────────────────────
  async auth() {
    try {
      const currentuser: AuthenticatedUser | null =
        await this.authService.GuardUserAuth();

      if (currentuser && currentuser.attributes) {
        this.currentUser = currentuser.attributes;
        // after auth, load profile and follow state
        this.getUser();
      } else {
        this.currentUser = null;
        // still load public profile
        this.getUser();
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      this.currentUser = null;
      this.getUser(); // load public profile anyway
    }
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Uploads
  // ────────────────────────────────────────────────────────────────────────────
  async onFileSelected(event: any, choice: boolean): Promise<void> {
    this.files = event.target.files;
    const imageprew: File = event.target.files[0];
    if (imageprew) {
      this.imageprew = await this.readAsDataURL(imageprew);
    }
    this.uploadImage(this.files, choice);
  }

  readAsDataURL(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject('Error reading file');
      reader.readAsDataURL(file);
    });
  }

  async uploadImage(files: FileList, choice: boolean) {
    if (!files || files.length === 0) return;

    const file = files[0]; // only 1 file for profile / cover

    if (choice === false) {
      // PROFILE
      this.subs.add(
        this.userService.updateProfilePicture(file).subscribe({
          next: (r) => {
            console.log('profile updated', r);
            this.getUser(); // reload profile
          },
          error: (e) => console.error(e),
        })
      );
    }

    if (choice === true) {
      // COVER
      this.subs.add(
        this.userService.updateCoverPicture(file).subscribe({
          next: (r) => {
            console.log('cover updated', r);
            this.getUser(); // reload profile
          },
          error: (e) => console.error(e),
        })
      );
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
    // call your API to save editProfile if needed
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

    // placeholder legacy flow you had:
    this.apiservice.UpdateUser(editProfile).then(() => {
      const input = { id: this.currentUser!.sub };
      return this.apiservice.UpdateUser(input);
    });
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Messaging
  // ────────────────────────────────────────────────────────────────────────────
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

  // kept (no-op, you had unsubscribe before)
  async updateUserFunction() {
    if (!this.currentUser?.sub) return;
    // add live user updates if you need, unsub handled by this.subs
  }
}
