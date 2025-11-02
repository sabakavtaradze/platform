import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CreatecontentdialogComponent } from '../gadgets/createcontent/createcontentdialog/createcontentdialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { APIService } from 'src/app/API.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { HeaderService } from 'src/app/services/header.service';
// 🔑 Import the necessary interfaces for type safety
import {
  AuthenticatedUser,
  UserAttributes,
} from 'src/app/interfaces/authentication/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  // 🔑 Added OnInit and OnDestroy

  profilepic =
    'https://mediaslide-europe.storage.googleapis.com/models1/pictures/4652/21561/large-1689261475-ac626d0436f735d75e355b62843bb5ce.jpg'; // 🔑 Type currentUser to match the attributes derived from the JWT
  currentUser: any;
  errorLoadingImage: boolean = false;
  profileUser: any;
  profilePicture: any;
  notoficationAlert: boolean = false;
  friendsUpdateSubscribe: any;
  s3BucketUrl =
    'https://platform-storage-ea64737a135009-staging.s3.amazonaws.com/public/';
  @Input() activePage: string = '';

  constructor(
    private headerservice: HeaderService,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private apiservice: APIService,
    private notificationservice: NotificationsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.auth();
  }

  ngOnDestroy(): void {
    if (this.friendsUpdateSubscribe) {
      this.friendsUpdateSubscribe.unsubscribe();
    }
  }

  createPost(): void {
    if (!this.currentUser) {
      // Optionally redirect or show an alert if trying to post while logged out
      alert('Please log in to create a post.');
      return;
    }
    let dialog = this.dialog.open(CreatecontentdialogComponent, {
      data: {},
      width: '100%',
    });
    dialog.afterClosed().subscribe((result: any) => {});
  }
  /**
   * EDITED: Uses GuardUserAuth (token-based) and safely accesses attributes.
   */

  async auth() {
    try {
      // GuardUserAuth returns AuthenticatedUser | null
      const user: AuthenticatedUser | null = await this.authService.GuardUserAuth();
      if(user){
      this.currentUser = user.attributes.sub
      console.log(this.currentUser)
        this.getUser()
        // FIX: Safely check if a user object exists and has attributes
        // this.updateFromNotifications();
    }
    else {
        this.currentUser = null;
        console.warn('User not authenticated.');
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      this.currentUser = null;
    }
  }

  /**
   * 🔑 FIXED: Added the missing API call to fetch and set this.profileUser
   */

  async getUser() {
    // Ensure both currentUser and its sub property exist before calling API
   
    try {
      // 🔑 Fetch and set profileUser using the authenticated user's ID

      // Now that profileUser is set, proceed with logic that depends on it:
       this.userService.getOwnProfilePicture().subscribe(item => {
        this.profilePicture = item.data
        console.log(this.profilePicture)
       } )
      console.log(this.profilePicture);
      // this.getFollowers();
      // this.notificationsSubscribe();
    } catch (error) {
      console.error('Error fetching profile user:', error);
    }
  }
  handleImageError() {
    this.errorLoadingImage = true;
  }
  /**
   * Updated notificationsseen to use safe checking for currentUser.sub
   */
  async notificationsseen() {
    if (!this.currentUser || !this.currentUser.sub) {
      console.error(
        'Cannot update notifications seen: Current user SUB is missing.'
      );
      return;
    }
    try {
      let date = new Date();
      let time = date.toISOString();
      let input = {
        id: this.currentUser.sub,
        notificationsseen: time,
      };
      // let updateseen = await this.apiservice.UpdateUser(input);
      this.notoficationAlert = false;
    } catch (e) {
      console.log(e);
    }
  }
  /**
   * Updated notificationsSubscribe to use safe checking for currentUser.sub
   */

  notificationsSubscribe(): void {
    // if (!this.currentUser || !this.currentUser.sub) {
    //   console.error(
    //     'Cannot subscribe to notifications: Current user SUB is missing.'
    //   );
    //   return;
    // }
    // let filter = {
    //   id: { eq: this.currentUser.sub },
    // }; // Unsubscribe from previous listener if it exists

    // if (this.friendsUpdateSubscribe) {
    //   this.friendsUpdateSubscribe.unsubscribe();
    // }

    // this.friendsUpdateSubscribe = this.apiservice
    //   .OnUpdateFriendsListener(filter)
    //   .subscribe((message) => {
    //     // Ensure this doesn't cause a loop. Returning getFollowers() will cause re-rendering.
    //     // If getFollowers() doesn't trigger a subscription/write, this is fine.
    //     return this.getFollowers(), message;
    //   });
  }
  /**
   * Updated getFollowers to use safe checking for currentUser.sub
   */
  async getFollowers() {
    if (!this.currentUser || !this.currentUser.sub) {
      console.error('Cannot fetch followers: Current user SUB is missing.');
      return;
    }
    try {
      let filter = {
        friendsID: { eq: this.currentUser.sub },
      };
      let getfollowers = await this.apiservice.ListFollowers(filter);
      if (this.profileUser && this.profileUser.notificationsseen !== null) {
        let checkseen = getfollowers.items.some((e: any) => {
          let dateA = new Date(this.profileUser.notificationsseen);
          let dateB = new Date(e.createdAt);
          return dateA < dateB;
        });
        this.notoficationAlert = checkseen;
      }
      if (
        this.profileUser &&
        this.profileUser.notificationsseen === null &&
        getfollowers.items.length > 0
      ) {
        this.notoficationAlert = true;
      }
      return;
    } catch (e) {
      console.log(e);
    }
  }
  showHeader() {
    this.headerservice.setScrollPosition(true);
  }
  async updateFromNotifications() {
    try {
      this.notificationservice.getnotificationPosition().subscribe((e) => {
        // Re-call notificationsseen to update the alert state when a notification event is received
        // this.notificationsseen();
      });
    } catch (e) {
      console.log(e);
    }
  }
}
