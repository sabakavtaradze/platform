import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contentzoomdialog',
  templateUrl: './contentzoomdialog.component.html',
  styleUrls: ['./contentzoomdialog.component.scss']
})
export class ContentzoomdialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ContentzoomdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    
    console.log(data)

  }

  onNoClick(): void {

    this.dialogRef.close();
  }
}
