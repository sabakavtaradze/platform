import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatimagedialogComponent } from './chatimagedialog.component';

describe('ChatimagedialogComponent', () => {
  let component: ChatimagedialogComponent;
  let fixture: ComponentFixture<ChatimagedialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatimagedialogComponent]
    });
    fixture = TestBed.createComponent(ChatimagedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
