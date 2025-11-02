import { Component } from '@angular/core';
import { APIService } from 'src/app/API.service';
import { chatList } from 'src/app/interfaces/chat/interfaceChat';
import Auth from '@aws-amplify/auth';
import { Router } from '@angular/router';
import { APIServicem } from 'src/app/apiservicem';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  currentUser: String = ""
  headerBackName: string = ''
  chatroom: boolean = true;
  authuser: any;
  messageSubscription: any;
  messageList: any;
  chatUsersList: any;
  ChatName = "Chat"
  constructor(private router: Router, public apiservice: APIService, private am: APIServicem, private authGuard: AuthenticationService) { }
  chatLink(x: any) {
    console.log(x)
    this.router.navigate(['/chat/chatroom/' + x.chatroom.id]);
  }
  chatlistt: any = [];


  async chatlist() {
    try {
      this.currentUser = this.authuser.attributes.sub
      this.chatUsersList = await this.am.getchatroom(this.authuser.attributes.sub)
      console.log(this.chatUsersList)
      if (this.chatUsersList.Chatrooms?.items) {
        this.chatlistt = this.chatUsersList.Chatrooms?.items

        this.chatlistt.sort((a: any, b: any) => {
          if (a.chatroom.LastMessage !== null && a.chatroom.LastMessage !== undefined) {
            return a.chatroom.LastMessage.updatedAt > b.chatroom.LastMessage.updatedAt ? -1 : 1
          }
          else{
            return
          }
        });
        console.log(this.chatlistt)
      }
    } catch (error) {
      console.error(error)
    }
  }



  // updateMessage(e: any) {


  //   const s = this.chatlistt.forEach((m: any) => {
  //     if (m.chatroom.id === e.chatroomID) {
  //       m.chatroom.LastMessage = e
  //     }
  //   });
  //   this.chatlistt.sort((a: any, b: any) =>
  //     a.chatroom.LastMessage.updatedAt > b.chatroom.LastMessage.updatedAt ? -1 : 1
  //   );
  //   console.log(this.chatlistt)


  // }



  async userAuth() {
    try {
      this.authuser =
        // this.authuser = await Auth.currentAuthenticatedUser()
        this.authuser = await this.authGuard.GuardUserAuth()
      console.log(this.authuser)
      // 
      return this.chatlist(), this.newtry(), this.messagesseen()
    }
    catch (error) {
      console.error(error)
    }
  }
  ngOnInit() {
    this.userAuth()
  }






  newtry(): void {
    let filter = {
      userId: { eq: this.authuser.attributes.sub }
    };
    this.messageSubscription = this.apiservice.OnUpdateUserChatroomListener(filter).subscribe((message) => {
      this.chatlist()
      this.messagesseen()
      return message
    });
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }



  async messagesseen() {
    try {
      let date = new Date()
      let time = date.toISOString()
      console.log(time)
      console.log(this.currentUser)
      let input = {
        id: this.currentUser.toString(),
        messagesseen: time
      }

      let updateseen = await this.apiservice.UpdateUser(input)
      console.log(updateseen)
    }
    catch (e) {
      console.log(e)
    }
  }



  // async newtry() {
  //   try {
  //     console.log(this.authuser.attributes.sub)
  //     let filter = {
  //       id: this.authuser.attributes.sub
  //     }
  //     let limit = "2"
  //     let saba = await this.am.getChatroomsByUser(this.authuser.attributes.sub, limit)
  //     console.log(saba)
  //   } catch (error) {
  //     console.error(error)
  //   }

  // }





}
