import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentcommentdialogcommentComponent } from './contentcommentdialogcomment.component';

describe('ContentcommentdialogcommentComponent', () => {
  let component: ContentcommentdialogcommentComponent;
  let fixture: ComponentFixture<ContentcommentdialogcommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentcommentdialogcommentComponent]
    });
    fixture = TestBed.createComponent(ContentcommentdialogcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
