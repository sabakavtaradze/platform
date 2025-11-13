import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  private readonly baseUrl = `${environment.apiUrl}/api/friendship`;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ✅ get friend count of current user (token)
  getOwnFriendCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/count`, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ get friend count of user by id
  getFriendCountById(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/count/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ auto check if profile owner or not
  getFriendCountAuto(profileUserId: number, loggedUserId: number): Observable<any> {
    if (profileUserId === loggedUserId) {
      return this.getOwnFriendCount();
    }
    return this.getFriendCountById(profileUserId);
  }
}
