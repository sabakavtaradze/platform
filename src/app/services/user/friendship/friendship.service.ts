import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/interfaces/ResponseInterface/BaseResponse';


@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  private readonly baseUrl = 'https://localhost:7274/api/follow';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ================= FOLLOW CHECK =================
  getIsFollowing(profileUserId: number): Observable<BaseResponse<boolean>> {
    return this.http.get<BaseResponse<boolean>>(
      `${this.baseUrl}/check/${profileUserId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // ================= LISTS =================
  getFollowers(profileUserId: number): Observable<BaseResponse<any[]>> {
    return this.http.get<BaseResponse<any[]>>(
      `${this.baseUrl}/followers/${profileUserId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getFollowing(profileUserId: number): Observable<BaseResponse<any[]>> {
    return this.http.get<BaseResponse<any[]>>(
      `${this.baseUrl}/following/${profileUserId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // ================= COUNTS =================
  getFollowersCount(profileUserId: number): Observable<BaseResponse<number>> {
    return this.http.get<BaseResponse<number>>(
      `${this.baseUrl}/followers/count/${profileUserId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getFollowingCount(profileUserId: number): Observable<BaseResponse<number>> {
    return this.http.get<BaseResponse<number>>(
      `${this.baseUrl}/following/count/${profileUserId}`,
      { headers: this.getAuthHeaders() }
    );
  }
  followUser(targetUserId: number): Observable<BaseResponse<boolean>> {
  return this.http.post<BaseResponse<boolean>>(
    `${this.baseUrl}/${targetUserId}`,
    {},
    { headers: this.getAuthHeaders() }
  );
}

// UNFOLLOW user
unfollowUser(targetUserId: number): Observable<BaseResponse<boolean>> {
  return this.http.delete<BaseResponse<boolean>>(
    `${this.baseUrl}/${targetUserId}`,
    { headers: this.getAuthHeaders() }
  );
}

}
