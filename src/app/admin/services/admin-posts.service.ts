import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminPostsService {
    private readonly baseUrl = `${environment.apiUrl}${(environment as any).adminPostsPath ?? '/api/admin/posts'}`;

    constructor(private http: HttpClient) { }

    search(q: string): Observable<any> {
        const params = new HttpParams().set('q', q);
        return this.http.get<any>(`${this.baseUrl}/search`, { params });
    }

    /** Attach JWT if present (some backends still require explicit header) */
    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('jwtToken');
        return token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();
    }

    /** Admin update post — mirrors PostService.updatePost but targets admin endpoint */
    updatePost(postId: number, postText: string, existingImageUrls: string[] = [], newFiles?: FileList): Observable<any> {
        const formData = new FormData();
        formData.append('PostID', String(postId));
        formData.append('PostText', postText ?? '');

        if (existingImageUrls?.length) {
            existingImageUrls.forEach(url => formData.append('ExistingImageUrls', url));
        }

        if (newFiles && newFiles.length > 0) {
            Array.from(newFiles).forEach(file => formData.append('NewFiles', file, file.name));
        }

        return this.http.put(`${this.baseUrl}/update`, formData, {
            headers: this.getAuthHeaders()
        });
    }

    /** Admin delete post */
    deletePost(postId: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/delete/${postId}`, {
            headers: this.getAuthHeaders()
        });
    }
}
