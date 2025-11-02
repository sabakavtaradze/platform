// src/app/services/post/post-comment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PostCommentService {
  
  // Explicitly prepend '/api' (Corrected URL path)
  private apiUrl = environment.apiUrl + '/api/Comments'; 

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken(); 
    
    if (token) {
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }
    // NOTE: If the endpoint is [AllowAnonymous], empty headers are fine.
    return new HttpHeaders();
  }
  
  createCommentFormData(formData: FormData): Observable<any> {
    const options = {
        headers: this.getAuthHeaders() 
    };
    return this.http.post(this.apiUrl + '/create', formData, options);
  }

    // 🆕 NEW METHOD: Get comments by Post ID
    getCommentsByPostID(postID: number): Observable<any> {
        // Construct the full URL: .../api/Comments/post/{postID}
        const url = `${this.apiUrl}/post/${postID}`;
        
        // Pass headers, even if [AllowAnonymous] is used on the backend, 
        // to handle cases where the user *is* logged in (e.g., getting user-specific info).
        const options = {
            headers: this.getAuthHeaders() 
        };

        return this.http.get<any>(url, options);
    }
}