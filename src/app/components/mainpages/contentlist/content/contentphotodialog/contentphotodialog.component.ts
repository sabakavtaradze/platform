import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-contentphotodialog',
    templateUrl: './contentphotodialog.component.html',
    styleUrls: ['./contentphotodialog.component.scss'],
    standalone: false
})
export class ContentphotodialogComponent {
  image:any;
  s3BucketUrl = 'https://platform-storage-ea64737a135009-staging.s3.amazonaws.com/public/';
  constructor(
    public dialogRef: MatDialogRef<ContentphotodialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.image = data.image 
    
    console.log(data)
    console.log(this.image)
  }

  onNoClick(): void {

    this.dialogRef.close();
  }
}
