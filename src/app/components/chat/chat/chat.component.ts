import { Component, OnInit, OnDestroy } from '@angular/core';
import { APIService } from 'src/app/API.service';
import { chatList } from 'src/app/interfaces/chat/interfaceChat';
import { Router } from '@angular/router';
import { APIServicem } from 'src/app/apiservicem';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { ChatroomService } from 'src/app/services/user/chatroom/chatroom.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    standalone: false
})
export class ChatComponent implements OnInit, OnDestroy {
  currentUser: any = '';
  headerBackName: string = '';
  chatroom: boolean = true;
  authuser: any;
  messageSubscription: any;
  messageList: any;
  chatUsersList: any;
  ChatName = 'Chat';
  chatlistt: any[] = [];
  private subs = new Subscription();

  constructor(
    private router: Router,
    public apiservice: APIService,
    private am: APIServicem,
    private authService: AuthenticationService,
    private chatroomService: ChatroomService
  ) {}

  chatLink(x: any) {
    console.log(x);
    const id = x.chatRoomId || x.chatRoomID || x.chatroom?.id || x.chatroom?.chatroom?.id || x.chatroom?.id;
    if (id) this.router.navigate(['/chat/chatroom/' + id]);
  }


  async chatlist() {
    try {
      this.currentUser = this.authuser?.attributes?.sub;
      // use ChatroomService to get chatrooms (returns BaseResponse<any[]>)
      this.subs.add(
        this.chatroomService.getChatRooms().subscribe((res) => {
          if (res?.isSuccess && Array.isArray(res.data)) {
            this.chatlistt = res.data;
            // optionally sort if lastMessageSentAt or chatroom.LastMessage exists
            this.chatlistt.sort((a: any, b: any) => {
              const aDate = a.lastMessageSentAt || a.chatroom?.LastMessage?.updatedAt || '';
              const bDate = b.lastMessageSentAt || b.chatroom?.LastMessage?.updatedAt || '';
              if (!aDate || !bDate) return 0;
              return aDate > bDate ? -1 : 1;
            });
            console.log(this.chatlistt);
          }
        })
      );
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
      this.authuser = await this.authService.GuardUserAuth();
      console.log(this.authuser);
      await this.chatlist();
      this.newtry();
      this.messagesseen();
    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit() {
    this.userAuth();
  }






  newtry(): void {
    let filter = {
      userId: { eq: this.authuser.attributes.sub }
    };
    this.messageSubscription = this.apiservice.OnUpdateUserChatroomListener(filter).subscribe((message) => {
      this.chatlist();
      this.messagesseen();
      return message;
    });
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    this.subs.unsubscribe();
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
