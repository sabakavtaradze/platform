import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface TikTokServiceResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
    errorMessage?: string;
}

@Injectable({ providedIn: 'root' })
export class TikTokService {
    private readonly baseUrl = `${environment.apiUrl}/api/TikTok`;

    constructor(private readonly http: HttpClient) { }

    getLoginUrl() {
        return this.http.get<TikTokServiceResponse<string>>(`${this.baseUrl}/login`);
    }

    getFollowers() {
        return this.http.get<TikTokServiceResponse<number>>(`${this.baseUrl}/followers`);
    }
}
