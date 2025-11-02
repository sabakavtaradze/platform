import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentzoomdialogComponent } from './contentzoomdialog.component';

describe('ContentzoomdialogComponent', () => {
  let component: ContentzoomdialogComponent;
  let fixture: ComponentFixture<ContentzoomdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentzoomdialogComponent]
    });
    fixture = TestBed.createComponent(ContentzoomdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
