import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecontentComponent } from './createcontent.component';

describe('CreatecontentComponent', () => {
  let component: CreatecontentComponent;
  let fixture: ComponentFixture<CreatecontentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatecontentComponent]
    });
    fixture = TestBed.createComponent(CreatecontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
