import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { APIService } from 'src/app/API.service';
import { APIServicem } from 'src/app/apiservicem';
import { chatUsersList } from 'src/app/interfaces/chat/interfaceChat';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';

@Component({
  selector: 'app-chatusers',
  templateUrl: './chatusers.component.html',
  styleUrls: ['./chatusers.component.scss']
})
export class ChatusersComponent {
  headerBackName: string = '/chat'
  currentUser: any;
  ChatName: string = "Contacts"
  constructor(private router: Router, public apiservice: APIService, private apiservicem: APIServicem, private authGuard: AuthenticationService) {
  }

 
  async createChat(x: any) {
    try {
      let userchats = await this.apiservicem.getchatroom(this.currentUser.attributes.sub)
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
            userId: this.currentUser.attributes.sub
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
  async auth() {
    try {
      this.currentUser = await this.authGuard.GuardUserAuth()
    }
    catch (error) {
      console.error(error)
    }
  }
  chats: chatUsersList[] = []

  ngOnInit() {
    this.auth()
    this.apiservice.ListUsers().then((result) => {
      console.log(result)
      this.chats = result.items.filter(item => item !== null) as chatUsersList[];
    })
  }
}
