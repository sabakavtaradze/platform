import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragpreviewComponent } from './dragpreview.component';

describe('DragpreviewComponent', () => {
  let component: DragpreviewComponent;
  let fixture: ComponentFixture<DragpreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DragpreviewComponent]
    });
    fixture = TestBed.createComponent(DragpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
