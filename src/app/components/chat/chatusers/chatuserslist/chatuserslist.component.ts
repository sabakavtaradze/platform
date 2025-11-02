import { Component, Input } from '@angular/core';
import { chatUsersList } from 'src/app/interfaces/chat/interfaceChat';

@Component({
  selector: 'app-chatuserslist',
  templateUrl: './chatuserslist.component.html',
  styleUrls: ['./chatuserslist.component.scss']
})
export class ChatuserslistComponent {
  @Input() item!: chatUsersList;
  errorLoadingImage= false
  
  handleImageError() {
    this.errorLoadingImage = true;
  }
}
