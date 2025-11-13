import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/interfaces/ResponseInterface/BaseResponse';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ChatroomService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  // 🔹 Attach JWT token to all requests
  private getAuthHeaders(includeContentType: boolean = true): HttpHeaders {
    const token = this.authService.getAuthToken();
    let headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });

    // ❗ Add Content-Type only for JSON, not for FormData
    if (includeContentType) headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  // ============================================================
  // 🔹 CHATROOM MANAGEMENT
  // ============================================================
  getChatRooms(): Observable<BaseResponse<any[]>> {
    return this.http.get<BaseResponse<any[]>>(`${environment.apiUrl}/api/chat/rooms`, {
      headers: this.getAuthHeaders(),
    });
  }

  openOrCreateRoom(otherUserId: number): Observable<BaseResponse<number>> {
    return this.http.post<BaseResponse<number>>(
      `${environment.apiUrl}/api/chat/open-or-create/${otherUserId}`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  // ✅ DELETE CHATROOM (Full Cascade: messages + room)
  deleteChatRoom(chatRoomId: number): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(
      `${environment.apiUrl}/api/chat/room/${chatRoomId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // ============================================================
  // 🔹 SEND MESSAGE (multipart/form-data): chatRoomId, content, images[]
  // ============================================================
  sendMessage(data: {
    chatRoomId: number;
    content?: string;
    images?: File[];
  }): Observable<BaseResponse<any>> {
    const formData = new FormData();
    formData.append('chatRoomId', String(data.chatRoomId));
    if (data.content) formData.append('content', data.content);
    data.images?.forEach((file) => formData.append('images', file, file.name));

    return this.http.post<BaseResponse<any>>(`${environment.apiUrl}/api/Chat/send`, formData, {
      headers: this.getAuthHeaders(false),
    });
  }

  // ============================================================
  // 🔹 CHATROOM & MESSAGE DATA
  // ============================================================
  getChatRoomById(id: number): Observable<BaseResponse<any>> {
    return this.http.get<BaseResponse<any>>(`${environment.apiUrl}/api/chat/room/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

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
  ): Observable<BaseResponse<{ messages: any[]; totalCount: number }>> {
    return this.http.get<BaseResponse<{ messages: any[]; totalCount: number }>>(
      `${environment.apiUrl}/api/chat/history-paged/${chatRoomId}?skip=${skip}&take=${take}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getRoomMediaUrls(chatRoomId: number, skip = 0, take = 20): Observable<BaseResponse<string[]>> {
    return this.http.get<BaseResponse<string[]>>(
      `${environment.apiUrl}/api/chat/media/${chatRoomId}?skip=${skip}&take=${take}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // ============================================================
  // 🔹 NOTIFICATIONS
  // ============================================================
  markRead(chatRoomId: number): Observable<BaseResponse<boolean>> {
    return this.http.post<BaseResponse<boolean>>(
      `${environment.apiUrl}/api/chat/mark-read/${chatRoomId}`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  getUnseenCount(): Observable<BaseResponse<number>> {
    return this.http.get<BaseResponse<number>>(`${environment.apiUrl}/api/chat/unseen-count`, {
      headers: this.getAuthHeaders(),
    });
  }
}
