// src/app/services/post/post-comment.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostCommentService {
  // Explicitly prepend '/api' (Corrected URL path)
  private apiUrl = environment.apiUrl + '/api/Comments';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();

    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    }
    // NOTE: If the endpoint is [AllowAnonymous], empty headers are fine.
    return new HttpHeaders();
  }

  createCommentFormData(formData: FormData): Observable<any> {
    const options = {
      headers: this.getAuthHeaders(),
    };
    return this.http.post(this.apiUrl + '/create', formData, options);
  }

  // 🆕 NEW METHOD: Get comments by Post ID
  getCommentsByPostID(postID: number): Observable<any> {
    const url = `${this.apiUrl}/post/${postID}`;
    const options = {
      headers: this.getAuthHeaders(),
    };
    return this.http.get<any>(url, options);
  }

  // 🆕🆕 NEW METHOD: Get comment count by Post ID
  getCommentCount(postID: number): Observable<any> {
    const url = `${this.apiUrl}/count/${postID}`;
    const options = {
      headers: this.getAuthHeaders(),
    };
    return this.http.get<any>(url, options);
  }
}
