import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenteditdialogComponent } from './contenteditdialog.component';

describe('ContenteditdialogComponent', () => {
  let component: ContenteditdialogComponent;
  let fixture: ComponentFixture<ContenteditdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContenteditdialogComponent]
    });
    fixture = TestBed.createComponent(ContenteditdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
