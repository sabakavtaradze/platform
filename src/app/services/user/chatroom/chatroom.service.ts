import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from 'src/app/interfaces/ResponseInterface/BaseResponse';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ChatroomService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  // Attach JWT from AuthenticationService
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  // GET user chatrooms
  getChatRooms(): Observable<BaseResponse<any[]>> {
    return this.http.get<BaseResponse<any[]>>(
      `${environment.apiUrl}/api/chat/rooms`,
      { headers: this.getAuthHeaders() }
    );
  }

  // ✅ create or open room with user
  openOrCreateRoom(otherUserId: number): Observable<BaseResponse<number>> {
    return this.http.post<BaseResponse<number>>(
      `${environment.apiUrl}/api/chat/open-or-create/${otherUserId}`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  // ✅ send directly to room id
  // ✅ send via recipient API (text or images)
  sendMessage(dto: {
    recipientID: number;
    content: string | null;
    images: string[] | null;
  }): Observable<BaseResponse<any>> {
    return this.http.post<BaseResponse<any>>(
      `${environment.apiUrl}/api/chat/send`,
      dto,
      { headers: this.getAuthHeaders() }
    );
  }

  getChatRoomById(id: number): Observable<BaseResponse<any>> {
    return this.http.get<BaseResponse<any>>(
      `${environment.apiUrl}/api/chat/room/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }
  // ✅ get history by room
  // ✅ get history by room
  getHistory(chatRoomId: number): Observable<BaseResponse<any[]>> {
    return this.http.get<BaseResponse<any[]>>(
      `${environment.apiUrl}/api/chat/history/${chatRoomId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getHistoryPaged(
    chatRoomId: number,
    skip: number,
    take: number
  ): Observable<BaseResponse<any[]>> {
    return this.http.get<BaseResponse<any[]>>(
      `${environment.apiUrl}/api/chat/history/${chatRoomId}?skip=${skip}&take=${take}`,
      { headers: this.getAuthHeaders() }
    );
  }
  // ✅ mark read
  // ✅ mark read
  markRead(chatRoomId: number): Observable<BaseResponse<any>> {
    return this.http.post<BaseResponse<any>>(
      `${environment.apiUrl}/api/chat/mark-read/${chatRoomId}`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  // ✅ unseen count
  // ✅ unseen count
  getUnseenCount(): Observable<BaseResponse<number>> {
    return this.http.get<BaseResponse<number>>(
      `${environment.apiUrl}/api/chat/unseen-count`,
      { headers: this.getAuthHeaders() }
    );
  }
}
