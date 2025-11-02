import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecontentdialogComponent } from './createcontentdialog.component';

describe('CreatecontentdialogComponent', () => {
  let component: CreatecontentdialogComponent;
  let fixture: ComponentFixture<CreatecontentdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatecontentdialogComponent]
    });
    fixture = TestBed.createComponent(CreatecontentdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
