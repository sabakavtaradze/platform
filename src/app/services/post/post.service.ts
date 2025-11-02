import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = `${environment.apiUrl}/api/Posts`;

  constructor(private http: HttpClient) {}

  /** 🔑 Helper — automatically attach JWT header */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  /** 🟢 Create post (text + optional files) */
  createPost(postText: string, files?: FileList): Observable<any> {
    const formData = new FormData();
    formData.append('PostText', postText);

    if (files && files.length > 0) {
      Array.from(files).forEach(file => formData.append('Files', file, file.name));
    }

    return this.http.post(`${this.baseUrl}/create`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  updatePost(postId: number, postText: string, existingImageUrls: string[] = [], newFiles?: FileList): Observable<any> {
    const formData = new FormData();
  
    formData.append('PostID', String(postId));
    formData.append('PostText', postText ?? "");
  
    // only append existing if > 0
    if (existingImageUrls.length > 0) {
      existingImageUrls.forEach(url => formData.append('ExistingImageUrls', url));
    }
  
    // only append newFiles if exist
    if (newFiles && newFiles.length > 0) {
      Array.from(newFiles).forEach(file => formData.append('NewFiles', file, file.name));
    }
  
    return this.http.put(`${this.baseUrl}/update`, formData, {
      headers: this.getAuthHeaders()
    });
  }
  
  

  /** 🔴 Delete post — backend extracts user from token */
  deletePost(postId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${postId}`, {
      headers: this.getAuthHeaders()
    });
  }

  /** 👁️ Get all posts */
  getAllPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  /** 👁️ Get single post by ID */
  getPostById(postId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${postId}/`);
  }
}
