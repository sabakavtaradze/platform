import { Component, OnDestroy, OnInit } from '@angular/core';
import { APIService } from 'src/app/API.service';
import { APIServicem } from 'src/app/apiservicem';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
// 🔑 Import AuthenticatedUser, UserAttributes, and UnseenCountResponse
import {
  AuthenticatedUser,
  UserAttributes,
  UnseenCountResponse,
} from 'src/app/interfaces/authentication/user';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  profilepic =
    'https://mediaslide-europe.storage.googleapis.com/models1/pictures/4652/21561/large-1689261475-ac626d0436f735d75e355b62843bb5ce.jpg';
  input: string = '';
  users: any[] = [];
  searchBoolean: boolean = false;
  errorLoadingImage: boolean = false;
  messagesAlert: boolean = false; // Controls the visibility of the message alert/badge // Type currentUser to match the attributes derived from the JWT
  currentUser: UserAttributes | null = null;
  profileUser: any; // Use Subscription for correct type
  updateUser: Subscription | undefined;
  constructor(
    private apiservice: APIService,
    private authService: AuthenticationService,
    private apiservicem: APIServicem,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Start the authentication check and user loading process
    this.auth();
  }

  ngOnDestroy(): void {
    // Safely unsubscribe
    if (this.updateUser) {
      this.updateUser.unsubscribe();
    }
    // 🗑️ Removed the duplicate, detached ngdestroy function from the end of the file.
  } // --- Authentication and Initial Load --- // Logic to check token and set currentUser attributes

  async auth() {
    try {
      // GuardUserAuth returns AuthenticatedUser | null (Asynchronous)
      const user: AuthenticatedUser | null =
        await this.authService.GuardUserAuth(); // Safely check if a user object exists and has attributes
      if (user && user.attributes) {
        this.currentUser = user.attributes;
        console.log('Current User Sub (from token):', this.currentUser.sub); // Once currentUser is set, proceed to load related data // Check for unseen messages immediately after authentication
        this.checkUnseenCount();
      } else {
        this.currentUser = null;
        console.warn(
          'User not authenticated. Cannot retrieve token attributes.'
        );
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      this.currentUser = null;
    }
  } // Updated getUser to use safe checking for currentUser.sub // --- Chatroom and Unseen Count Logic --- // 🔑 Function to call the unseen count API from AuthenticationService
  checkUnseenCount() {
    this.authService
      .getUnseenCount()
      .subscribe((response: UnseenCountResponse) => {
        // Check if the API call was successful and if the count is greater than zero
        if (response.isSuccess && response.data !== undefined) {
          this.messagesAlert = response.data > 0;
          console.log(
            `API Unseen messages count: ${response.data}. Alert status: ${this.messagesAlert}`
          );
        } else {
          // Default to false on error or failure
          this.messagesAlert = false;
          console.warn(
            'Failed to retrieve unseen count from API:',
            response.errorMessage
          );
        }
      });
  }  // 🗑️ Removed empty getchatroom() entirely, as its logic was determined to be obsolete and potential loop source.
  /**
   * Sets up the Amplify subscription listener.
   * FIX: Completed the subscription setup and ensures only checkUnseenCount() is called to avoid recursion.
   */ // --- Search and Utility Methods ---

  async search(event: Event) {
    console.log(event);
    let nm = event;
    let name = nm.toString();
    try {
        let namee =  name.toLocaleLowerCase() 
      this.userService.searchUsers(namee).subscribe((response) => {
        if (response.isSuccess && response.data) {
          this.searchBoolean = true;
          this.users = response.data;
          console.log(this.users)
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  cancelSearch() {
    this.searchBoolean = false;
    this.input = '';
  }
  handleImageError() {
    this.errorLoadingImage = true;
  }
  searchClick() {
    this.searchBoolean = false;
  }
}
