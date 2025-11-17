import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'app-chatlist',
    templateUrl: './chatlist.component.html',
    styleUrls: ['./chatlist.component.scss'],
    standalone: false
})
export class ChatlistComponent {
  @Input() item!: any; // chat summary object
  @Input() currentUser!: any;
  errorLoadingImage = false;
  usersFiltered: string = '';
  profilepicture: string = '';
  lastSenderName: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.syncFromItem();
    this.getUser()
  }
  getUser(){
    this.userService.getUserById(this.item.otherUserId).subscribe(response => {
      console.log(response)
      this.usersFiltered = response.data?.username || '';
      this.profilepicture = response.data?.userProfilePictureUrl || '';
    });
  }
  // Map summary fields from backend to local view fields
  private syncFromItem() {
    if (!this.item) return;
    this.usersFiltered = this.item.otherUsername || this.item.name || '';
    this.profilepicture = this.item.profilepicture || '';
    if (this.item.lastMessageSenderId !== undefined && this.item.lastMessageSenderId !== null) {
      this.lastSenderName = this.item.lastMessageSenderId == this.currentUser ? 'you' : (this.item.otherUsername || '').split(' ')[0];
    } else {
      this.lastSenderName = null;
    }
  }

  handleImageError() {
    this.errorLoadingImage = true;
  }
}
 


