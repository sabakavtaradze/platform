import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatecontentdialogComponent } from './createcontentdialog/createcontentdialog.component';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
@Component({
    selector: 'app-createcontent',
    templateUrl: './createcontent.component.html',
    styleUrls: ['./createcontent.component.scss'],
    standalone: false
})
export class CreatecontentComponent {
img = "https://scontent.ftbs5-2.fna.fbcdn.net/v/t39.30808-6/347568221_1193371834704470_3431834618243283281_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEuzOaUCEOK2lKyqrRL2o04vZ34MTRKICm9nfgxNEogKcQgz0RooGHeF1fVu6apHUsKgd3Z52_J9osyyeFSSSg8&_nc_ohc=0fuyDEv5yCcAX8yMWTU&_nc_ht=scontent.ftbs5-2.fna&oh=00_AfBc2XLrn3uCAk8Z4XzM50R9awNcKKqukBVBkSVTcZqgTw&oe=65320BF5"
currentUser:any 

constructor(public dialog: MatDialog, private authguard: AuthenticationService){
    
}
// enterAnimationDuration: string, exitAnimationDuration: string, 
openDialog( ): void {
  let dialog = this.dialog.open(CreatecontentdialogComponent, {
     data: {
      currentUser: this.currentUser
     },
     width: '100%',
     // max-width: '100%',
    //  enterAnimationDuration,
    //  exitAnimationDuration,
   });
   dialog.afterClosed().subscribe((result: any) => {
      // this.filtered = result
      // console.log(result)
   });
 }
 async auth() {
  try {
    this.currentUser = await this.authguard.GuardUserAuth()
    console.log(this.currentUser)
    return   
  }catch(error){
    console.log(error)
  }
}
ngOnInit(){
  this.auth()
  // this.openDialog()
  // Auth.currentAuthenticatedUser({
  //   bypassCache:false
  // }).then(async user =>{
  //   this.userid
  // })
}

}
