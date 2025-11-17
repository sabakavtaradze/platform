import { Component, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogpickertemplateComponent } from '../dialogpickertemplate/dialogpickertemplate.component';
import {Professions } from 'src/app/interfaces/library/interfacelibrary';



@Component({
    selector: 'app-dialogpicker',
    templateUrl: './dialogpicker.component.html',
    styleUrls: ['./dialogpicker.component.scss'],
    standalone: false
})
export class DialogpickerComponent {
  // @Input() professions: Category[] = [];
  @Input() filterModels!:Professions;
  filtered!:Professions;
  

  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
   let dialog = this.dialog.open(DialogpickertemplateComponent, {
      data: {filterModels: this.filterModels},
      width: '100%',
      // max-width: '100%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialog.afterClosed().subscribe((result: Professions) => {
       this.filtered = result
       console.log(result)
       console.log(this.filtered)
    });
  }
  ngOnInit(){
    

  }
}
