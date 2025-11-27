import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TwitchLoginService } from 'src/app/services/twitch-login.service';

@Component({
    selector: 'app-twitch-callback',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './twitch-callback.component.html',
})
export class TwitchCallbackComponent implements OnInit {
    loading = true;
    error: string | null = null;
    followers = 0;
    profile: any;

    private accessToken = '';

    constructor(
        private readonly route: ActivatedRoute,
        private readonly twitch: TwitchLoginService,
        private readonly router: Router,
    ) { }

    ngOnInit(): void {
        const code = this.route.snapshot.queryParamMap.get('code');

        if (!code) {
            this.error = 'No code returned from Twitch.';
            this.loading = false;
            return;
        }

        this.twitch.exchangeCode(code).subscribe({
            next: (tokenData) => {
                this.accessToken = tokenData.access_token;
                this.fetchProfile();
            },
            error: () => {
                this.error = 'Unable to exchange the Twitch code.';
                this.loading = false;
            },
        });
    }

    private fetchProfile(): void {
        this.twitch.getProfile(this.accessToken).subscribe({
            next: (profile) => {
                this.profile = profile;
                console.log('🎮 Twitch profile', profile);
                this.finalizeTwitchLink();
            },
            error: () => {
                this.error = 'Unable to read the Twitch profile.';
                this.loading = false;
            },
        });
    }

    private finalizeTwitchLink(): void {
        const jwt = localStorage.getItem('authToken');
        if (!jwt) {
            this.error = 'Please sign in before linking Twitch.';
            this.loading = false;
            return;
        }

        this.twitch.finalize(this.accessToken, jwt).subscribe({
            next: (res) => {
                const followerCount = res?.followers ?? res?.twitch?.followers ?? 0;
                this.followers = followerCount;
                console.log('✅ Twitch finalize response', res, 'followers', followerCount);
                this.loading = false;
                this.navigateToProfile();
            },
            error: () => {
                this.error = 'Failed to finalize Twitch account.';
                this.loading = false;
            },
        });
    }

    private navigateToProfile(): void {
        const profileId = this.extractProfileIdFromToken();
        if (profileId) {
            this.router.navigate(['/profile', profileId]);
        }
    }

    private extractProfileIdFromToken(): string | null {
        const token = localStorage.getItem('authToken');
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return (payload['nameid'] ?? payload['sub'] ?? payload['userID'] ?? null)?.toString() ?? null;
        } catch (e) {
            console.warn('Failed to parse auth token payload', e);
            return null;
        }
    }
}
