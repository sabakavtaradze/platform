import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TwitchLoginService {
    private readonly backend = `${environment.apiUrl}/api/auth/twitch`;

    constructor(private http: HttpClient) { }

    redirectToTwitchLogin(): void {
        const url =
            'https://id.twitch.tv/oauth2/authorize' +
            `?client_id=${environment.twitchClientId}` +
            `&redirect_uri=${encodeURIComponent(this.getRedirectUri())}` +
            '&response_type=code' +
            '&scope=user:read:email+user:read:follows' +
            '&force_verify=true';

        window.location.href = url;
    }

    private getRedirectUri(): string {
        if (typeof window === 'undefined') {
            return environment.twitchRedirectUri;
        }

        try {
            const origin = window.location.origin;
            return new URL('/auth/twitch/callback', origin).toString();
        } catch (error) {
            return environment.twitchRedirectUri;
        }
    }

    exchangeCode(code: string) {
        return this.http.post<any>(`${this.backend}/exchange`, { code });
    }

    getFollowers(accessToken: string) {
        return this.http.post<any>(`${this.backend}/followers`, { accessToken });
    }

    getProfile(accessToken: string) {
        return this.http.post<any>(`${this.backend}/me`, { accessToken });
    }

    finalize(accessToken: string, jwtToken: string) {
        return this.http.post<any>(
            `${this.backend}/finalize`,
            { accessToken },
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
    }
}
