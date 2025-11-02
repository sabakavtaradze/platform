import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogpickertemplateComponent } from './dialogpickertemplate.component';

describe('DialogpickertemplateComponent', () => {
  let component: DialogpickertemplateComponent;
  let fixture: ComponentFixture<DialogpickertemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogpickertemplateComponent]
    });
    fixture = TestBed.createComponent(DialogpickertemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
