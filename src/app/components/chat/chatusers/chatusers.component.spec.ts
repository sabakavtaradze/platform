import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatusersComponent } from './chatusers.component';

describe('ChatuserslistComponent', () => {
  let component: ChatusersComponent;
  let fixture: ComponentFixture<ChatusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatusersComponent]
    });
    fixture = TestBed.createComponent(ChatusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
