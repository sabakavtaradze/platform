import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentphotodialogComponent } from './contentphotodialog.component';

describe('ContentphotodialogComponent', () => {
  let component: ContentphotodialogComponent;
  let fixture: ComponentFixture<ContentphotodialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentphotodialogComponent]
    });
    fixture = TestBed.createComponent(ContentphotodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
