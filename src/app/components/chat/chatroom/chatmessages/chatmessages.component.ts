import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatimagedialogComponent } from '../chatimagedialog/chatimagedialog.component';


@Component({
  selector: 'app-chatmessages',
  templateUrl: './chatmessages.component.html',
  styleUrls: ['./chatmessages.component.scss']
})
export class ChatmessagesComponent {
  @Input() message!: any;
  @Input() currentUser!: any;
  owner: boolean = false;
  s3BucketUrl = 'https://platform-storage-ea64737a135009-staging.s3.amazonaws.com/public/'; 
  images:any[] = []

  // img = '';

  constructor(public dialog: MatDialog){

  }

  openImageDialog(image: any): void {
    const dialogRef = this.dialog.open(ChatimagedialogComponent, {
      data: {image: image},
      // panelClass: 'custom-dialog-panel',
      // backdropClass: "custom-dialog-backdrop"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
    // console.log("open")

  }
  getColumnClass(imageCount: number): string {
    if (imageCount === 1) {
      return 'col-12';
    }
    if (imageCount === 2) {
      return 'col-6';
    } else if (imageCount > 2) {
      return 'col-4';
    }
    else if (imageCount === 4) {
      return 'col-6';
    }
    
    else {
      return ''; // No class applied if neither condition is met
    }
  }

  imageProcess(message: any): void {
    if(message.images){

    message.images.forEach((el:any) => {
      let img  = `${this.s3BucketUrl}${el}`
      this.images.push(img)
    });
  }
  }
  ngOnInit(){
    if(this.currentUser.attributes.sub == this.message.senderID){
      this.owner = true;
      
    }
  }

}
