import { Component, Input, OnInit } from '@angular/core';
import { APIService } from 'src/app/API.service';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
// 🔑 Import the necessary interfaces for type safety
import { AuthenticatedUser, UserAttributes } from 'src/app/interfaces/authentication/user'; 

@Component({
    selector: 'app-notificationslist',
    templateUrl: './notificationslist.component.html',
    styleUrls: ['./notificationslist.component.scss'],
    standalone: false
})
export class NotificationslistComponent implements OnInit { // 🔑 Added OnInit
  @Input() follower:any;
  profileUser:any;
  profilePicture:any;
  s3BucketUrl = 'https://platform-storage-ea64737a135009-staging.s3.amazonaws.com/public/';
  profileOwner:any;
  profileId:any;
  // 🔑 Type currentUser to match the attributes derived from the JWT
  currentUser: UserAttributes | null = null; 
  
  // 🔑 Renamed 'authguard' to 'authService' for clarity
  constructor(private apiservice: APIService, private authService: AuthenticationService){

  }

  ngOnInit(): void {
    // 🔑 Call auth() first to establish currentUser
    this.auth();
    this.getUser();
    console.log(this.follower);
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

  imageProcess(image: any) {
    let img = `${this.s3BucketUrl}${image}`
    return img
  }

  async getUser() {
    // This method relies on the @Input() follower property
    if (!this.follower || !this.follower.userId) {
        console.warn("Cannot fetch user profile: Follower data is missing.");
        return;
    }
    
    try {
      let user = await this.apiservice.GetUser(this.follower.userId)
      this.profileUser = user
      if (this.profileUser.profilepicture) {
        this.profilePicture = this.imageProcess(this.profileUser.profilepicture)
      }
    }
    catch (error) {
      console.error(error);
    }
  }
}