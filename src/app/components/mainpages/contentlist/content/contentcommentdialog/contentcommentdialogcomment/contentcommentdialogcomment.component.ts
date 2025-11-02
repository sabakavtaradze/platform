import { Component, Input } from '@angular/core';
import { APIService } from 'src/app/API.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-contentcommentdialogcomment',
  templateUrl: './contentcommentdialogcomment.component.html',
  styleUrls: ['./contentcommentdialogcomment.component.scss']
})
export class ContentcommentdialogcommentComponent {
  @Input() comment!:any;
  user:any;
  profilepicture = ""
images: any[] = [];
errorLoadingImage = false
constructor(private apiservice: APIService, private userService: UserService){}

async getUser(){
  try{
  }catch(error){
    console.log(error)
  }
}
getprofilepicture(){
  this.userService.getProfilePicture(this.comment.author.userID).subscribe(item => {
    this.profilepicture = item.data
    console.log(this.profilepicture)
  })
}
handleImageError() {
  this.errorLoadingImage = true;
}
  ngOnInit(): void {
    this.getUser()
    this.getprofilepicture()
    console.log(this.comment)
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

}
