import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogpickerComponent } from '../dialogpicker/dialogpicker.component';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import { Category, Professions } from 'src/app/interfaces/library/interfacelibrary';


@Component({
  selector: 'app-dialogpickertemplate',
  templateUrl: './dialogpickertemplate.component.html',
  styleUrls: ['./dialogpickertemplate.component.scss']
})

export class DialogpickertemplateComponent {
  filterModels!:Professions;
  // professions: Category[]= [];
  // modelDetails!: ModelDetails;
  pickedMinAge:number = 0;
  pickedMaxAge:number = 0;
  pickedMinFollowers: number = 0;
  pickedMaxFollowers: number = 0;
  constructor(public dialogRef: MatDialogRef<DialogpickertemplateComponent>,@Inject(MAT_DIALOG_DATA) public data: any,) {
    // this.professions = data.filterModels.professions;
    this.filterModels = data.filterModels;
    this.pickedMinFollowers = data.filterModels.pickedProperties.minFollowers
    this.pickedMaxFollowers = data.filterModels.pickedProperties.maxFollowers
    this.pickedMinAge = data.filterModels.properties.minAge;
    this.pickedMaxAge = data.filterModels.properties.maxAge;
    // console.log(this.filterProfessions)
    
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  ngOnInit(){
    
    console.log(this.filterModels)

  }
profPick(a:Category){
   return a.active = !a.active
}

}
