import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  constructor(private http: HttpClient) {}

  // GET user chatrooms
  getChatRooms() {
    return this.http.get<any>(`${environment.apiUrl}/api/chat/rooms`);
  }

  // ✅ create or open room with user
  openOrCreateRoom(otherUserId:number) {
    return this.http.post<any>(
      `${environment.apiUrl}/api/chat/open-or-create/${otherUserId}`, 
      {}
    );
  }

  // ✅ send directly to room id
// ✅ send via recipient API (text or images)
sendMessage(dto:{ recipientID:number, content:string|null, images:string[]|null }){
  return this.http.post<any>(
    `${environment.apiUrl}/api/chat/send`,
    dto
  );
}
getChatRoomById(id:number){
  return this.http.get<any>(`${environment.apiUrl}/api/chat/room/${id}`);
}
  // ✅ get history by room
  getHistory(chatRoomId:number){
    return this.http.get<any>(
      `${environment.apiUrl}/api/chat/history/${chatRoomId}`
    );
  }
getHistoryPaged(chatRoomId:number, skip:number, take:number){
  return this.http.get<any>(
    `${environment.apiUrl}/api/chat/history/${chatRoomId}?skip=${skip}&take=${take}`
  );
}
  // ✅ mark read
  markRead(chatRoomId:number) {
    return this.http.post<any>(
      `${environment.apiUrl}/api/chat/mark-read/${chatRoomId}`,
      {}
    );
  }

  // ✅ unseen count
  getUnseenCount() {
    return this.http.get<any>(
      `${environment.apiUrl}/api/chat/unseen-count`
    );
  }
}
