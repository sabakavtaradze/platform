import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// Broadcasts feed refresh events (e.g., after creating a post)
@Injectable({ providedIn: 'root' })
export class FeedRefreshService {
  private refreshSubject = new Subject<void>();

  // Observable others can subscribe to
  get refresh$(): Observable<void> {
    return this.refreshSubject.asObservable();
  }

  // Emit a refresh event
  triggerRefresh(): void {
    this.refreshSubject.next();
  }
}
