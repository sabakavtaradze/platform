import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentvoteComponent } from './contentvote.component';

describe('ContentvoteComponent', () => {
  let component: ContentvoteComponent;
  let fixture: ComponentFixture<ContentvoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentvoteComponent]
    });
    fixture = TestBed.createComponent(ContentvoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
