import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { APIService } from 'src/app/API.service';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
// ❌ REMOVED: import { Auth, Storage } from 'aws-amplify';
import { APIServicem } from 'src/app/apiservicem';
import { MatDialog } from '@angular/material/dialog';
import { ContentphotodialogComponent } from '../../contentlist/content/contentphotodialog/contentphotodialog.component';
// 🔑 Import the necessary interfaces for type safety
import { AuthenticatedUser, UserAttributes } from 'src/app/interfaces/authentication/user'; 
import { FriendshipService } from 'src/app/services/user/friendship.service';
import { UserService } from 'src/app/services/user/user.service';
import { PostService } from 'src/app/services/post/post.service';

// ⚠️ Keeping original require for compatibility, replace with 'import { v4 as uuidv4 } from 'uuid';' if using npm package
const { "v4": uuidv4 } = require('uuid');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy { // 🔑 Added OnInit, OnDestroy
  // 🔑 Type currentUser to match the attributes derived from the JWT
  currentUser: UserAttributes | null = null; 
  profileId: any;
  profileUser: any;
  profilePicture: string = "";
  cover: string = "";
  imageprew: any;
  files!: FileList
  updateUser: any;
  profileOwner: boolean = false
  userIsFollowing: boolean = false
  profileImages: any;
  process: boolean = false;
  s3BucketUrl = 'https://platform-storage-ea64737a135009-staging.s3.amazonaws.com/public/';
  friendCount: number = 0;

  
  // 🔑 Renamed 'authguard' to 'authService' for clarity
  constructor(
    public dialog: MatDialog, 
    private authService: AuthenticationService, 
    private apiservice: APIService, 
    private activeRoute: ActivatedRoute, 
    private router: Router, 
    private apiservicem: APIServicem,
    private friendshipService: FriendshipService,
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.profileId = params.get('profileId');
      this.auth();
      // getUser will be called after auth is successful to ensure currentUser is set
    });
  }

  ngOnDestroy(): void {
    if (this.updateUser) {
      this.updateUser.unsubscribe();
    }
  }
  loadFriendCount() {
    if (!this.currentUser || !this.currentUser.sub) return;
  
    const profileId = Number(this.profileId);
    const loggedId = Number(this.currentUser.sub);
  
    this.friendshipService.getFriendCountAuto(profileId, loggedId)
      .subscribe(res => {
        if (res?.isSuccess) {
          this.friendCount = res.data;
        }
      });
  }
  
  /**
   * 🔑 Updated removeFriend to check for currentUser
   */
  async removeFriend() {
    if (!this.currentUser || !this.currentUser.sub) {
        console.error("Cannot remove friend: User not authenticated.");
        return;
    }
    
    this.process = true
    try {
      let sort = undefined
      let followersFilter = {
        userId: { eq: this.currentUser.sub } // 🔑 Use the sub from the token attributes
      }
      let checkFollowers = await this.apiservice.FollowersByFriendsID(this.profileUser.id, sort, followersFilter)

      if (checkFollowers !== null) {
        const checkHimFollowers = checkFollowers.items.some((e: any) => {
          return e.userId === this.currentUser!.sub
        })
        if (checkHimFollowers === true) {
          for (const e of checkFollowers.items) {
            if (e !== null) {
              let removeFollowerInput = {
                id: e.id
              }
              let removeFollowers = await this.apiservice.DeleteFollowers(removeFollowerInput)
              this.userIsFollowing = false
            }
          }
        }
      }

      let followingFilter = {
        userId: { eq: this.profileUser.id }
      }
      let checkFollowing = await this.apiservice.FollowingsByFriendsID(this.currentUser.sub, sort, followingFilter) // 🔑 Use the sub from the token attributes
      if (checkFollowing !== null) {
        const checkFollowers = checkFollowing.items.some((e: any) => {
          return e.userId === this.profileUser.id
        })
        if (checkFollowers === true) {
          for (const e of checkFollowing.items) {
            if (e !== null) {
              let removeFollowerInput = {
                id: e.id
              }
              let removeFollowers = await this.apiservice.DeleteFollowing(removeFollowerInput)
              this.userIsFollowing = false
            }
          }
        }
      }
      this.process = false
    }
    catch (error) {
      console.log(error)
      this.process = false
    }
  }


  /**
   * 🔑 Updated addFriend to check for currentUser
   */
  async addFriend(profileUser: any) {
    if (!this.currentUser || !this.currentUser.sub) {
        console.error("Cannot add friend: User not authenticated.");
        return;
    }
    
    this.process = true
   
  }


  messageUser() {
    console.log(this.profileId)
  }
  

  
  async getPictures() {
    try {
      // let input = {
      //   userid: { eq: this.profileUser.id },
      //   images: { size: { eq: 1 } }
      // }
      // let getPicture = await this.apiservice.ListPosts(input)
      // this.profileImages = getPicture.items
    }
    catch (e) {
      console.log(e)
    }
  }
  
  openImageDialog(post: any): void {
    const dialogRef = this.dialog.open(ContentphotodialogComponent, {
      panelClass: 'full-width-dialog',
      data: {
        image: post,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  
  /**
   * 🔑 Updated getUser to check for currentUser, but relies on profileId from route.
   */
  async getUser() {
    try {
      const owner = !!this.currentUser && Number(this.currentUser.sub) === Number(this.profileId);
      this.profileOwner = owner;
  
      this.loadFriendCount();
  
      // load user profile
      this.userService.getUserById(Number(this.profileId)).subscribe((res:any)=>{
        this.profileUser = res.data;  // <— your backend returns {data: user}
  console.log(this.profileUser)
        // display name is now profileUser.firstname lastname
  
        // profile picture
        if(owner){
          this.userService.getOwnProfilePicture().subscribe((r:any)=> this.profilePicture = r.data);
          this.userService.getCoverPicture().subscribe((r:any)=> this.cover = r.data);
        } else {
          this.userService.getProfilePicture(Number(this.profileId)).subscribe((r:any)=> this.profilePicture = r.data);
          this.userService.getCoverPictureById(Number(this.profileId)).subscribe((r:any)=> this.cover = r.data);
        }
  
        if(this.currentUser) this.checkFollowing();
  
        this.loadPhotos();
  
      });
    }catch(err){
      console.error(err);
    }
  }
  
  loadPhotos(){
    this.postService.getAllPosts().subscribe((p:any)=>{
      // filter posts that belong to this profile
      const userPosts = p.data.filter((x:any)=> x.userId == this.profileId);
  
      // flatten all image urls into one array
      this.profileImages = userPosts.flatMap((x:any)=> x.imageUrls); // backend must return imageUrls:string[]
    })
  }


  /**
   * 🔑 Updated checkFollowing to check for currentUser
   */
  async checkFollowing() {
    if (!this.currentUser || !this.currentUser.sub) {
        console.error("Cannot check following status: User not authenticated.");
        return;
    }
    
    try {
      let desc = undefined

    }
    catch (error) {
      console.log(error)
    }
  }


  /**
   * 🔑 EDITED: Uses GuardUserAuth (token-based) and safely accesses attributes.
   */
  async auth() {
    try {
      const currentuser: AuthenticatedUser | null = await this.authService.GuardUserAuth()
      
      // 🔑 FIX: Safely check if a user object exists and has attributes
      if (currentuser && currentuser.attributes) {
        this.currentUser = currentuser.attributes
        console.log("Current User Sub (from token):", this.currentUser.sub);
        // Load dependencies after successful auth
        this.getUser();
        // this.updateUserFunction();
      } else {
        this.currentUser = null;
        console.warn("User not authenticated.");
        this.getUser(); // Still call getUser to load the public profile data
      }
    }
    catch (error) {
      console.error("Authentication check failed:", error);
      this.currentUser = null;
      this.getUser(); // Still call getUser to load the public profile data
    }
  }


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
      reader.onload = () => {
        resolve(reader.result); 
      };
      reader.onerror = () => {
        reject('Error reading file'); 
      };
      reader.readAsDataURL(file); 
    });
  }
  
  /**
   * 🔑 EDITED: Removed AWS Storage.put logic and replaced with placeholder.
   */
  async uploadImage(files: FileList, choice: boolean) {
    if (!files || files.length === 0) return;
  
    const file = files[0]; // only 1 file for profile / cover
  
    if (choice === false) {
      // PROFILE
      this.userService.updateProfilePicture(file).subscribe({
        next: r => {
          console.log("profile updated", r);
          this.getUser(); // reload profile
        },
        error: e => console.error(e)
      });
    }
  
    if (choice === true) {
      // COVER
      this.userService.updateCoverPicture(file).subscribe({
        next: r => {
          console.log("cover updated", r);
          this.getUser(); // reload profile
        },
        error: e => console.error(e)
      });
    }
  }
  
  /**
   * 🔑 EDITED: Removed AWS Storage.remove logic and added checks.
   */
  editProfilePicture(imgs: any) {
    if (!this.currentUser || !this.currentUser.sub) return;

    let editProfile = {
      id: this.currentUser.sub,
      profilepicture: imgs[0] || null,
    }
    
    if (this.profileUser.profilepicture) {
        // ❌ REMOVED: Storage.remove(this.profileUser.profilepicture)
        // 🔑 TO DO: Replace with your custom image removal API call
        console.log(`[TO DO] Removing old profile picture: ${this.profileUser.profilepicture}`);
    }

    let editPic = this.apiservice.UpdateUser(editProfile).then(result => {
      let input = {
        id: this.currentUser!.sub
      }
      return this.apiservice.UpdateUser(input)
    })
  }
  
  /**
   * 🔑 EDITED: Removed AWS Storage.remove logic and added checks.
   */
  editCoverPicture(imgs: any) {
    if (!this.currentUser || !this.currentUser.sub) return;

    let editProfile = {
      id: this.currentUser.sub,
      cover: imgs[0] || null,
    }
    
    if (this.profileUser.cover) {
        // ❌ REMOVED: Storage.remove(this.profileUser.cover)
        // 🔑 TO DO: Replace with your custom image removal API call
        console.log(`[TO DO] Removing old cover picture: ${this.profileUser.cover}`);
    }

    let editPic = this.apiservice.UpdateUser(editProfile).then(result => {
      let input = {
        id: this.currentUser!.sub
      }
      return this.apiservice.UpdateUser(input)
    })
  }


  /**
   * 🔑 Updated updateUserFunction to check for currentUser
   */
  async updateUserFunction() {
    if (!this.currentUser || !this.currentUser.sub) {
        console.warn("Cannot subscribe to user updates: User not authenticated.");
        return;
    }
    
    let filter = {
      id: { eq: this.currentUser.sub } // 🔑 Use the sub from the token attributes
    };
    
    if (this.updateUser) {
        this.updateUser.unsubscribe();
    }
    
    
  }

  /**
   * 🔑 Updated createChat to check for currentUser
   */
  async createChat(x: any) {
    if (!this.currentUser || !this.currentUser.sub) {
        console.error("Cannot create chat: User not authenticated.");
        return;
    }
    
    try {
      let userchats = await this.apiservicem.getchatroom(this.currentUser.sub) // 🔑 Use the sub from the token attributes
      let commonchats = userchats.Chatrooms?.items || []
      let commonId: any[] = []
      let chatroom = commonchats.filter((chat: { chatroom: { users: { items: any[]; }; }; }) =>
        chat.chatroom.users.items.some(item => {
          if (item.user.id === x.id) {
            commonId.push(chat)
          }

        })
      );
      if (commonId.length > 0) {
        this.router.navigate(['/chat/chatroom/' + commonId[0].chatroom.id]);

      } else {
        let content = {
        }
        let chatRoom = await this.apiservice.CreateChatroom(content)
        if (chatRoom) {
          let userChatRoomContent = {
            chatroomId: chatRoom.id,
            userId: x.id
          }
          let myuserChatRoomContent = {
            chatroomId: chatRoom.id,
            userId: this.currentUser.sub // 🔑 Use the sub from the token attributes
          }
          let userChatRoom = await this.apiservice.CreateUserChatroom(userChatRoomContent)
          let myuserChatRoom = await this.apiservice.CreateUserChatroom(myuserChatRoomContent)
          this.router.navigate(['/chat/chatroom/' + chatRoom.id]);
        }
      }

    } catch (error) {
      console.log(error)
    }
  }
}