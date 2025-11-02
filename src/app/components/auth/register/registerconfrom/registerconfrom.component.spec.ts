import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterconfromComponent } from './registerconfrom.component';

describe('RegisterconfromComponent', () => {
  let component: RegisterconfromComponent;
  let fixture: ComponentFixture<RegisterconfromComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterconfromComponent]
    });
    fixture = TestBed.createComponent(RegisterconfromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
