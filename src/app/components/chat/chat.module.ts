import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { ChatlistComponent } from './chat/chatlist/chatlist.component';
import { ChatroomComponent } from './chatroom/ChatroomComponent';
import { ChatusersComponent } from './chatusers/chatusers.component';
import { ChatuserslistComponent } from './chatusers/chatuserslist/chatuserslist.component';
import { APIServicem } from 'src/app/apiservicem';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatmessagesComponent } from './chatroom/chatmessages/chatmessages.component';
import { ChatheaderComponent } from './chatheader/chatheader.component';
import { ScrollToBottomDirective } from './chatroom/scroll-to-bottom.directive';
// import { MessageTimePipe } from 'src/app/pipes/message-time.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChatimagedialogComponent } from './chatroom/chatimagedialog/chatimagedialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedmoduleModule } from '../sharedmodule/sharedmodule.module';

const routes: Routes = [
 
  { path: '', component: ChatComponent, canActivate: [AuthenticationService], pathMatch: 'full', },
  { path: 'users', component: ChatusersComponent, canActivate: [AuthenticationService], pathMatch: 'full', },

  { path: 'chatroom/:chatId', component: ChatroomComponent, canActivate: [AuthenticationService], pathMatch: 'full', },

];


@NgModule({
  declarations: [
    ChatComponent,
    ChatlistComponent,
    ChatroomComponent,
    ChatusersComponent,
    ChatuserslistComponent,
    ChatmessagesComponent,
    ChatheaderComponent,
    ScrollToBottomDirective,
    ChatimagedialogComponent 
  ],
  imports: [
  CommonModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  SharedmoduleModule,
  RouterModule.forChild(routes)
    
  ],
  providers: [ChatimagedialogComponent]
})
export class ChatModule { }
