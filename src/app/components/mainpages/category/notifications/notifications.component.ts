import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
// 🔑 Import the necessary interfaces for type safety
import { AuthenticatedUser, UserAttributes } from 'src/app/interfaces/authentication/user';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: false
})
export class NotificationsComponent implements OnInit, OnDestroy {
  // 🔑 Type currentUser to match the attributes derived from the JWT
  currentUser: UserAttributes | null = null;
  followers: any;
  profileUser: any;
  profilePicture: any;
  s3BucketUrl = 'https://platform-storage-ea64737a135009-staging.s3.amazonaws.com/public/';
  profileOwner: any;
  profileId: any;
  friendsUpdateSubscribe: any;

  // 🔑 Renamed 'authguard' to 'authService' for clarity
  constructor(
    private authService: AuthenticationService,
    private headerservice: HeaderService,
    private notificationservice: NotificationsService
  ) { }

  ngOnInit(): void {
    this.auth()
    this.sendSeen()
  }

  ngOnDestroy(): void {
    if (this.friendsUpdateSubscribe) {
      this.friendsUpdateSubscribe.unsubscribe();
    }
  }

  /**
   * 🔑 EDITED: Uses GuardUserAuth (token-based) and safely accesses attributes.
   */
  async auth() {
    try {
      // GuardUserAuth returns AuthenticatedUser | null
      const user: AuthenticatedUser | null = await this.authService.GuardUserAuth()

      // 🔑 FIX: Safely check if a user object exists and has attributes
      if (user && user.attributes) {
        this.currentUser = user.attributes
        console.log("Current User Sub (from token):", this.currentUser.sub);
        // Load dependencies after successful auth
        this.getFollowers();
        this.notificationsSubscribe();
      } else {
        this.currentUser = null;
        console.warn("User not authenticated.");
      }
    }
    catch (error) {
      console.error("Authentication check failed:", error);
      this.currentUser = null;
    }
  }

  /**
   * 🔑 Updated getFollowers to check for currentUser
   */
  async getFollowers() {
    // Check if the current user ID is available
    if (!this.currentUser || !this.currentUser.sub) {
      console.warn("Cannot fetch followers: Current user SUB is missing.");
      return;
    }

    console.log(this.currentUser)

    try {
      let filter = {
        friendsID: { eq: this.currentUser.sub } // 🔑 Use the sub from the token attributes
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  @HostListener('window:scroll', ['$event.target'])
  onScroll(scrollElement: any) {
    try {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      // ✅ FIX for TypeScript Error 2345: Convert scrollY (number) to a boolean.
      // Assuming 'false' means header hidden/scrolled, and 'true' means header visible/at top.
      // Use a threshold (e.g., 50px) to determine the boolean state.
      const headerVisiable = scrollY < 50;

      this.headerservice.setScrollPosition(headerVisiable);

    } catch (error) {
      console.error('Error in scroll event:', error);
    }
  }

  imageProcess(image: any) {
    let img = `${this.s3BucketUrl}${image}`
    return img
  }

  sendSeen() {
    this.notificationservice.setnotificationPosition(false)
  }

  /**
   * 🔑 Updated notificationsSubscribe to check for currentUser
   */
  notificationsSubscribe(): void {
    // Check if the current user ID is available
    if (!this.currentUser || !this.currentUser.sub) {
      console.warn("Cannot subscribe to updates: Current user SUB is missing.");
      return;
    }

    let filter = {
      id: { eq: this.currentUser.sub } // 🔑 Use the sub from the token attributes
    };

    // Unsubscribe from previous listener if it exists
    if (this.friendsUpdateSubscribe) {
      this.friendsUpdateSubscribe.unsubscribe();
    }


  }
}