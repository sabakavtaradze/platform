import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { TikTokService, TikTokServiceResponse } from 'src/app/services/tiktok.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-tiktok-callback',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tiktok-callback.component.html',
    styleUrls: ['./tiktok-callback.component.scss'],
})
export class TikTokCallbackComponent implements OnInit {
    loading = true;
    followers: number | null = null;
    error: string | null = null;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly http: HttpClient,
        private readonly tiktokService: TikTokService
    ) { }

    ngOnInit(): void {
        const code = this.route.snapshot.queryParamMap.get('code');
        const state = this.route.snapshot.queryParamMap.get('state');

        const success = this.route.snapshot.queryParamMap.get('success');

        if (code && state) {
            const params = new HttpParams({ fromObject: { code, state } });

            this.http
                .get<TikTokServiceResponse<void>>(`${environment.apiUrl}/api/tiktok/exchange`, {
                    params,
                    withCredentials: true,
                })
                .pipe(switchMap(() => this.tiktokService.getFollowers()))
                .subscribe({
                    next: (response: TikTokServiceResponse<number>) => this.handleFollowerResponse(response),
                    error: (err) => {
                        console.error('TikTok callback or followers request failed', err);
                        this.loading = false;
                        this.followers = null;
                        this.error = 'Unable to contact TikTok endpoint.';
                    },
                });
        } else if (success === 'true') {
            this.fetchFollowersOnly();
        } else {
            this.loading = false;
            this.error = 'Missing TikTok callback data.';
        }
    }

    private fetchFollowersOnly(): void {
        this.tiktokService.getFollowers().subscribe({
            next: (response) => this.handleFollowerResponse(response),
            error: (err) => {
                console.error('TikTok followers request failed', err);
                this.loading = false;
                this.followers = null;
                this.error = 'Unable to contact TikTok follower endpoint.';
            },
        });
    }

    private handleFollowerResponse(response: TikTokServiceResponse<number>): void {
        this.loading = false;
        if (response?.isSuccess && typeof response.data === 'number') {
            this.followers = response.data;
            this.error = null;
        } else {
            this.followers = null;
            this.error = response?.errorMessage ?? 'Unable to read TikTok follower count.';
        }
    }
}
