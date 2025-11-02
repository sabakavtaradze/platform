import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }
  private notificationsseen = new BehaviorSubject<boolean>(false);

  setnotificationPosition(notification: boolean) {
    this.notificationsseen.next(notification);
  }

  getnotificationPosition(): Observable<boolean> {
    return this.notificationsseen.asObservable();
  }
  private messagesseen = new BehaviorSubject<boolean>(false);

  setmessagesPosition(notification: boolean) {
    this.notificationsseen.next(notification);
  }

  getmessagesPosition(): Observable<boolean> {
    return this.notificationsseen.asObservable();
  }

}
