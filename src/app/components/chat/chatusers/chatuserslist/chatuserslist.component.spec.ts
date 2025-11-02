import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatuserslistComponent } from './chatuserslist.component';

describe('ChatuserslistComponent', () => {
  let component: ChatuserslistComponent;
  let fixture: ComponentFixture<ChatuserslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatuserslistComponent]
    });
    fixture = TestBed.createComponent(ChatuserslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
