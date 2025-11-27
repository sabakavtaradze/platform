import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Professions } from 'src/app/interfaces/library/interfacelibrary';
import { DialogFilterResult, DialogpickertemplateComponent } from '../dialogpickertemplate/dialogpickertemplate.component';



@Component({
  selector: 'app-dialogpicker',
  templateUrl: './dialogpicker.component.html',
  styleUrls: ['./dialogpicker.component.scss'],
  standalone: false
})
export class DialogpickerComponent {
  // @Input() professions: Category[] = [];
  @Input() filterModels!: Professions;
  filtered?: DialogFilterResult;
  @Output() filterApplied = new EventEmitter<DialogFilterResult>();


  constructor(public dialog: MatDialog) { }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialog = this.dialog.open(DialogpickertemplateComponent, {
      data: { filterModels: this.buildDialogFilters() },
      width: '100%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialog.afterClosed().subscribe((result: DialogFilterResult | undefined) => {
      if (result) {
        this.filtered = result;
        this.filterModels = result.professions;
        this.filterApplied.emit(result);
      }
    });
  }

  private buildDialogFilters(): Professions {
    if (!this.filterModels) {
      return {
        professions: [],
        properties: { minAge: 18, maxAge: 55, minFollowers: 0, maxFollowers: 50000 },
        pickedProperties: { minAge: 18, maxAge: 55, minFollowers: 0, maxFollowers: 50000 },
      };
    }

    return {
      professions: this.filterModels.professions.map((profession) => ({ ...profession })),
      properties: { ...this.filterModels.properties },
      pickedProperties: { ...this.filterModels.pickedProperties },
    };
  }
}
