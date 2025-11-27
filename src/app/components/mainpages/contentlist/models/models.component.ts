import { Component, Input } from '@angular/core';
import { Models } from 'src/app/interfaces/library/interfacelibrary';

// import { StarRatingConfigService } from 'angular-star-rating';
@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
  standalone: false
})
export class ModelsComponent {
  @Input() item!: Models;
  ariaValueText(current: number, max: number) {
    return `${current} out of ${max} hearts`;
  }
  getHalfStarClass = true

  constructor() {

  }



}