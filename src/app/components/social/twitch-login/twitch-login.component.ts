import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TwitchLoginService } from 'src/app/services/twitch-login.service';

@Component({
    selector: 'app-twitch-login',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './twitch-login.component.html',
    styleUrls: ['./twitch-login.component.scss'],
})
export class TwitchLoginComponent {
    constructor(private readonly twitch: TwitchLoginService) { }

    login(): void {
        this.twitch.redirectToTwitchLogin();
    }
}
