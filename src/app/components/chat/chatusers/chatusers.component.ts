import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIServicem } from 'src/app/apiservicem';
import { chatUsersList } from 'src/app/interfaces/chat/interfaceChat';
import { SignalRService } from 'src/app/services/SignalRService/signal-rservice.service';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { ChatroomService } from 'src/app/services/user/chatroom/chatroom.service';

@Component({
  selector: 'app-chatusers',
  templateUrl: './chatusers.component.html',
  styleUrls: ['./chatusers.component.scss'],
  standalone: false
})
export class ChatusersComponent implements OnInit, OnDestroy {
  headerBackName: string = '/chat'
  currentUser: any;
  ChatName: string = "Contacts"
  private subs = new Subscription();
  chats: chatUsersList[] = []

  constructor(
    private router: Router,
    private apiservicem: APIServicem,
    private authService: AuthenticationService,
    private chatroomService: ChatroomService
    , private chatSignalR: SignalRService
  ) {
  }


  async createChat(x: any) {
    try {
      this.subs.add(
        this.chatroomService.openOrCreateRoom(x.id).subscribe(response => {
          if (response && response.data) {
            this.router.navigate(['/chat/chatroom/' + response.data]);
          }
        })
      );
    } catch (error) {
      console.log(error)
    }
  }

  async auth() {
    try {

      this.authService.GuardUserAuth().then(user => {
        this.currentUser = user;
      })
    }
    catch (error) {
      console.error(error)
    }
  }
  getChatrooms() {
    this.subs.add(
      this.chatroomService.getChatRooms().subscribe((result) => {
        console.log(result)
        this.chats = result.data.filter(item => item !== null) as chatUsersList[];
      })
    );
  }

  ngOnInit() {
    (async () => {
      await this.auth();
      this.getChatrooms();

      // start SignalR connection and listen for messages
      try {
        this.chatSignalR.startConnection();
        this.chatSignalR.listenForMessages();
      } catch (e) {
        console.warn('SignalR start failed', e);
      }

      // subscribe to incoming messages and refresh chat list or update UI
      this.subs.add(
        this.chatSignalR.messageReceived$.subscribe(msg => {
          if (!msg) return;
          console.log('SignalR message in chatusers:', msg);
          // simple strategy: refresh chatrooms when a new message arrives
          this.getChatrooms();
        })
      );

      // also refresh when server signals chat list changes (create/update/delete)
      this.subs.add(
        this.chatSignalR.chatListEvent$.subscribe(evt => {
          if (!evt) return;
          this.getChatrooms();
        })
      );
    })();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
