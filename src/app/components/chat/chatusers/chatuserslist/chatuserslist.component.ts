import { Component, Input } from '@angular/core';
import { chatUsersList } from 'src/app/interfaces/chat/interfaceChat';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-chatuserslist',
  templateUrl: './chatuserslist.component.html',
  styleUrls: ['./chatuserslist.component.scss']
})
export class ChatuserslistComponent {
  @Input() item!: chatUsersList;
  errorLoadingImage= false
  user: any;
  constructor(private userService: UserService)   {

  }
  async ngOnInit() {
     this.userService.getUserById(this.item.otherUserId).subscribe(response => {
      this.user = response.data;
      
     })
  }
  handleImageError() {
    this.errorLoadingImage = true;
  }
}
