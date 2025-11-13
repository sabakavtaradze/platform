import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { ChatComponent } from './chat/chat.component';
import { ChatlistComponent } from './chat/chatlist/chatlist.component';
import { ChatheaderComponent } from './chatheader/chatheader.component';
import { ChatmessagesComponent } from './chatroom/chatmessages/chatmessages.component';
import { ChatroomComponent } from './chatroom/ChatroomComponent';
import { ScrollToBottomDirective } from './chatroom/scroll-to-bottom.directive';
import { ChatusersComponent } from './chatusers/chatusers.component';
import { ChatuserslistComponent } from './chatusers/chatuserslist/chatuserslist.component';
// import { MessageTimePipe } from 'src/app/pipes/message-time.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TruncateWordsPipe } from 'src/app/pipes/truncate-words.pipe';
import { SharedmoduleModule } from '../sharedmodule/sharedmodule.module';
import { ChatimagedialogComponent } from './chatroom/chatimagedialog/chatimagedialog.component';

const routes: Routes = [
  { path: '', component: ChatComponent, canActivate: [AuthenticationService], pathMatch: 'full' },
  {
    path: 'users',
    component: ChatusersComponent,
    canActivate: [AuthenticationService],
    pathMatch: 'full',
  },

  {
    path: 'chatroom/:chatId',
    component: ChatroomComponent,
    canActivate: [AuthenticationService],
    pathMatch: 'full',
  },
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
    ChatimagedialogComponent,
    TruncateWordsPipe,
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
    RouterModule.forChild(routes),
  ],
  providers: [ChatimagedialogComponent],
})
export class ChatModule {}
