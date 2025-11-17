import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-chatimagedialog',
    templateUrl: './chatimagedialog.component.html',
    styleUrls: ['./chatimagedialog.component.scss'],
    standalone: false
})
export class ChatimagedialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ChatimagedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  onNoClick(): void {

    this.dialogRef.close();
  }
}
