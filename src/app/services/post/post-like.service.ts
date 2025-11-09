import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from 'src/app/interfaces/ResponseInterface/BaseResponse';

@Injectable({
  providedIn: 'root'
})
export class PostLikeService {

  constructor(private http: HttpClient){}

  // POST api/PostLike/toggle/{postId}
  toggleLike(postId:number): Observable<BaseResponse<boolean>>{
    return this.http.post<BaseResponse<boolean>>(`${environment.apiUrl}/api/PostLike/toggle/${postId}`, {});
  }

  // GET api/PostLike/count/{postId}
  getLikesCount(postId:number): Observable<BaseResponse<number>>{
    return this.http.get<BaseResponse<number>>(`${environment.apiUrl}/api/PostLike/count/${postId}`);
  }

  // GET api/PostLike/userliked/{postId}
  userLiked(postId:number): Observable<BaseResponse<boolean>>{
    return this.http.get<BaseResponse<boolean>>(`${environment.apiUrl}/api/PostLike/userliked/${postId}`);
  }

}
