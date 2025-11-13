import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface ServiceResponse<T> {
  data: T;
  isSuccess: boolean;
  message: string;
  errorMessage?: string;
}

interface UserPublicDTO {
  id: number;
  name: string;
  email: string;
  profilePicture?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}/api/User`;
  // Broadcast current user's profile picture URL to listeners (footer, header, etc.)
  private profilePictureSubject = new BehaviorSubject<string | null>(null);
  profilePicture$ = this.profilePictureSubject.asObservable();

  constructor(private http: HttpClient) {}

  // 🔒 Attach JWT to all calls
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // or from your AuthenticationService
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // 🟢 Upload or update both profile & cover pictures
  updatePictures(profile?: File, cover?: File): Observable<any> {
    const formData = new FormData();
    if (profile) formData.append('Profile', profile);
    if (cover) formData.append('Cover', cover);
    return this.http.put(`${this.baseUrl}/update-pictures`, formData, {
      headers: this.getAuthHeaders(),
    });
  }

  // 🖼️ Update profile picture only
  updateProfilePicture(profile: File): Observable<any> {
    const formData = new FormData();
    formData.append('File', profile);
    return this.http
      .put(`${this.baseUrl}/update-profile-picture`, formData, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        tap(() => {
          // After successful update, refresh and emit latest picture URL
          this.refreshOwnProfilePicture();
        })
      );
  }

  // 🖼️ Update cover picture only
  updateCoverPicture(cover: File): Observable<any> {
    const formData = new FormData();
    formData.append('File', cover);
    return this.http.put(`${this.baseUrl}/update-cover-picture`, formData, {
      headers: this.getAuthHeaders(),
    });
  }

  // 🟢 Get current user's profile picture (from backend)
  getOwnProfilePicture(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile-picture`, {
      headers: this.getAuthHeaders(),
    });
  }

  // 🔵 Get profile picture by userId
  getProfilePicture(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}/profile-picture`, {
      headers: this.getAuthHeaders(),
    });
  }

  // 🟣 Get current user's cover picture
  getCoverPicture(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cover-picture`, {
      headers: this.getAuthHeaders(),
    });
  }

  // 🔵 Get cover picture by userId
  getCoverPictureById(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}/cover-picture`, {
      headers: this.getAuthHeaders(),
    });
  }
  // 🧩 get user profile by id
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Emit a new value to subscribers
  setProfilePicture(url: string | null): void {
    this.profilePictureSubject.next(url);
  }

  // Fetch current user's profile picture from backend and broadcast
  refreshOwnProfilePicture(): void {
    this.getOwnProfilePicture().subscribe({
      next: (res: any) => this.setProfilePicture(res?.data ?? null),
      error: () => this.setProfilePicture(null),
    });
  }

  // 🔍 Search users by name
  searchUsers(query: string): Observable<ServiceResponse<UserPublicDTO[]>> {
    return this.http.get<ServiceResponse<UserPublicDTO[]>>(`${this.baseUrl}/search`, {
      params: { q: query },
      headers: this.getAuthHeaders(),
    });
  }
}
