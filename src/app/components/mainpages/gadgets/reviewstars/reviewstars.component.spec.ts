import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewstarsComponent } from './reviewstars.component';

describe('ReviewstarsComponent', () => {
  let component: ReviewstarsComponent;
  let fixture: ComponentFixture<ReviewstarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewstarsComponent]
    });
    fixture = TestBed.createComponent(ReviewstarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
