import { Component, Input } from '@angular/core';

// import { StarRatingConfigService } from 'angular-star-rating';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
interface Item {
  name: string;
  profileImg: string;
  img: string;
  age: number;
  followers: number;
  stars: number;
  profession: string;
}
// export interface Item {
//   name?: string;
//   profileImg?: string;
//   img?:string;
//   age?: number;
//   followers?: number;
//   stars?: number;

// }
@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
  
})
export class ModelsComponent {
  @Input() item!: Item;
	ariaValueText(current: number, max: number) {
		return `${current} out of ${max} hearts`;
	}
  getHalfStarClass = true

  constructor() {

  }



}