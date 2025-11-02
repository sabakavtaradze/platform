import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogpickerComponent } from './dialogpicker.component';

describe('DialogpickerComponent', () => {
  let component: DialogpickerComponent;
  let fixture: ComponentFixture<DialogpickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogpickerComponent]
    });
    fixture = TestBed.createComponent(DialogpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
