import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomComponent } from './ChatroomComponent';

describe('ChatroomComponent', () => {
  let component: ChatroomComponent;
  let fixture: ComponentFixture<ChatroomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatroomComponent]
    });
    fixture = TestBed.createComponent(ChatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
