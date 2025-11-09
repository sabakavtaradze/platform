import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResponse } from 'src/app/interfaces/ResponseInterface';
@Injectable({
  providedIn: 'root'
})
export class PostLikeService {

  private baseUrl = environment.apiUrl + "/api/postlike";

  constructor(private http: HttpClient) { }

  // toggle like -> backend returns ServiceResponse<bool>
  toggle(postId: number) {
    return this.http.post<BaseResponse<boolean>>(`${this.baseUrl}/toggle/${postId}`, {});
  }

  // count likes of post -> backend returns ServiceResponse<number>
  getLikeCount(postId: number) {
    return this.http.get<BaseResponse<number>>(`${this.baseUrl}/count/${postId}`);
  }

  // check if current user liked -> backend returns ServiceResponse<bool>
  userLiked(postId: number) {
    return this.http.get<BaseResponse<boolean>>(`${this.baseUrl}/userliked/${postId}`);
  }
}
