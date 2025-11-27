import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminUsersService {
    private readonly baseUrl = `${environment.apiUrl}/api/admin/users`;

    constructor(private http: HttpClient, private authService: AuthenticationService) { }

    getAllUsers(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/get-all-users`, {
            headers: this.getAuthHeaders(),
        });
    }

    getUser(userId: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/user/${userId}`, {
            headers: this.getAuthHeaders(),
        });
    }

    createUser(payload: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/add-user`, payload, {
            headers: this.getAuthHeaders(),
        });
    }

    updateUser(userId: number, payload: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/update-user/${userId}`, payload, {
            headers: this.getAuthHeaders(),
        });
    }

    deleteUser(userId: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/delete-user/${userId}`, {
            headers: this.getAuthHeaders(),
        });
    }

    searchUsers(query: string): Observable<any> {
        const params = new HttpParams().set('q', query);
        return this.http.get<any>(`${this.baseUrl}/search`, {
            headers: this.getAuthHeaders(),
            params,
        });
    }

    uploadProfilePicture(userId: number, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('File', file);
        return this.http.put<any>(`${this.baseUrl}/update-profile-picture/${userId}`, formData, {
            headers: this.getAuthHeaders(),
        });
    }

    uploadCoverPicture(userId: number, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('File', file);
        return this.http.put<any>(`${this.baseUrl}/update-cover-picture/${userId}`, formData, {
            headers: this.getAuthHeaders(),
        });
    }

    private getAuthHeaders(): HttpHeaders {
        const token = this.authService.getAuthToken();
        return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
    }
}
