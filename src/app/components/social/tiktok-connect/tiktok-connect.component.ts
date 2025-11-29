import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TikTokService, TikTokServiceResponse } from 'src/app/services/tiktok.service';

@Component({
    selector: 'app-tiktok-connect',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tiktok-connect.component.html',
    styleUrls: ['./tiktok-connect.component.scss'],
})
export class TikTokConnectComponent {
    loading = false;
    error: string | null = null;

    constructor(private readonly tiktokService: TikTokService) { }

    connect(): void {
        if (this.loading) return;

        this.loading = true;
        this.error = null;

        this.tiktokService.getLoginUrl().subscribe({
            next: (response: TikTokServiceResponse<string>) => {
                if (!response?.isSuccess || !response?.data) {
                    this.error = response?.errorMessage ?? 'Unable to start TikTok login.';
                    this.loading = false;
                    return;
                }

                window.location.href = response.data;
            },
            error: (err) => {
                console.error('TikTok login request failed', err);
                this.error = 'Unable to start TikTok login.';
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            },
        });
    }
}
