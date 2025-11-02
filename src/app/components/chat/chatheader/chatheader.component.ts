import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chatheader',
  templateUrl: './chatheader.component.html',
  styleUrls: ['./chatheader.component.scss']
})
export class ChatheaderComponent {
@Input() headerBackName?: string = ""
@Input() chatroom?: boolean;
@Input() chatroomMenu?:boolean = false;
@Input() ChatName? :string = ""
@Input() HeaderNames?: string = ""
@Output() someEvent = new EventEmitter<string>();
constructor(){
  
}

deleteMessage(){
  this.someEvent.next('deleteMessage');
  console.log("deleteMessage")
}
deleteChat(){
  this.someEvent.next('deleteChat');
  console.log("deleteChat")

}


ngOnInit(){
  console.log(this.chatroomMenu)
}
}
