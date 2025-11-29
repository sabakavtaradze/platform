import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface ServiceResponse<T> {
    isSuccess: boolean;
    data?: T;
    message?: string;
    errorMessage?: string;
}

@Component({
    selector: 'app-tiktok-connected',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    template: `
        <div style="padding: 40px; padding-top:6rem; text-align:center;">
            <h2 *ngIf="loading">Connecting TikTok…</h2>
            <div *ngIf="error">
                <h2>TikTok connection failed ❌</h2>
                <p>{{ errorMessage }}</p>
                <button type="button" (click)="goProfile()">Back to profile</button>
            </div>
            <div *ngIf="success && !loading">
                <h2>TikTok connected! 🎉</h2>
                <p *ngIf="followers !== null">Followers: {{ followers | number }}</p>
                <p *ngIf="followers === null">Followers count unavailable.</p>
                <button type="button" (click)="goProfile()">Continue</button>
            </div>
        </div>
    `,
})
export class TikTokConnectedComponent implements OnInit {
    loading = true;
    success = false;
    error = false;
    followers: number | null = null;
    errorMessage: string | null = null;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly http: HttpClient,
        private readonly router: Router
    ) { }

    ngOnInit(): void {
        const successFlag = this.route.snapshot.queryParamMap.get('success');
        this.success = successFlag === 'true';
        this.fetchFollowers();
    }

    private fetchFollowers(): void {
        this.http
            .get<ServiceResponse<number | null>>(`${environment.apiUrl}/api/tiktok/followers`, { withCredentials: true })
            .subscribe({
                next: (res) => this.handleFollowerResponse(res),
                error: (err) => this.handleFollowerError(err),
            });
    }

    private handleFollowerResponse(res: ServiceResponse<number | null>): void {
        this.loading = false;
        if (res.isSuccess) {
            this.followers = res.data ?? null;
            this.success = true;
            this.error = false;
            this.errorMessage = null;
        } else {
            this.error = true;
            this.success = false;
            this.errorMessage = res.errorMessage ?? res.message ?? 'Could not load follower count.';
        }
    }

    private handleFollowerError(err: unknown): void {
        console.error('Follower fetch failed', err);
        this.loading = false;
        this.error = true;
        this.success = false;
        this.errorMessage = 'Unable to fetch TikTok followers right now.';
    }

    goProfile(): void {
        void this.router.navigate(['/profile']);
    }
}
