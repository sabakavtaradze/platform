import { Component, EventEmitter, Input, Output } from '@angular/core';
import { APIService } from 'src/app/API.service';
import { chatList } from 'src/app/interfaces/chat/interfaceChat';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.scss']
})
export class ChatlistComponent {
  @Input() item!: any;
  @Input() currentUser!: any;
  usersFiltered: any;
  profilepicture: string = ""
  @Input() authuser: any;
  messageSubscription: any;
  @Output() someEvent = new EventEmitter<any>();
  errorLoadingImage = false
  lastSenderName: any;
  constructor(private apiservice: APIService) {
  }
  update() {
    let notMe = this.item.chatroom.users.items.filter((item: any) => item.user.id !== this.currentUser);
    this.profilepicture = notMe[0].profilepicture
    let Me = this.item.chatroom.users.items.filter((item: any) => item.user.id == this.currentUser);
    if (notMe.length > 0) {
      // console.log("userFiltered")
      this.usersFiltered = notMe.map((item: any) => item.user.name).join(', ');
      if (notMe.length > 0) {
        this.profilepicture = notMe[0].user.profilepicture
      }
    } else {
      // console.log("notFIltered")
      this.usersFiltered = Me.map((item: any) => item.user.name).join(', ');

    }
    if (this.item.chatroom.LastMessage !== undefined && this.item.chatroom.LastMessage !== null) {

      let lastMessageSender = this.item.chatroom.users.items.filter((item: any) => item.user.id == this.item.chatroom.LastMessage.userID);
      let myName = Me[0].user.id
      let sender = lastMessageSender[0].user.id
      if (lastMessageSender !== undefined && lastMessageSender !== null) {
        if (myName === sender) {
          this.lastSenderName = "you"
        }
        if (myName !== sender) {
          let fullname = lastMessageSender[0].user.name
          this.lastSenderName = fullname.split(' ')[0];

        }
      }
    }

  }

  handleImageError() {
    this.errorLoadingImage = true;
  }
  ngOnInit() {
    this.update()
  }

}
