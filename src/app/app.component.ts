import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderService } from './services/header.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'socialplatform';

  components = true;
  chatId: any;
  productId: string | null = null;
  showComponent = true;
  profilePage = false;
  activePage = '';
  isHeaderVisible = false;
  hideHeaderScrollThreshold = 50;
  aboutPage = false;

  // 🔥 Subscriptions storage
  private routerSub!: Subscription;
  private headerScrollSub!: Subscription;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private headerService: HeaderService
  ) {
    // 🔥 Save subscription to destroy later
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const routerName = event.urlAfterRedirects;

        // Show bottom components only on main pages
        if (
          routerName !== '/about/privacy' &&
          routerName !== '/about/termsandconditions' &&
          routerName !== '/auth/welcome' &&
          routerName !== '/auth/login' &&
          routerName !== '/auth/register' &&
          routerName !== '/auth/registerconfrom' &&
          routerName !== '/chat' &&
          !routerName.includes('chat/chatroom') &&
          routerName !== '/chat/users'
        ) {
          this.components = true;

          if (routerName.includes('/feed')) this.activePage = 'feed';
          if (routerName.includes('/library')) this.activePage = 'library';
          if (routerName.includes('/notifications')) this.activePage = 'notifications';
          if (routerName.includes('/profile')) this.activePage = 'profile';
        } else {
          this.components = false;
        }

        // Profile page
        this.profilePage = routerName.includes('/profile');

        // About/Auth pages
        this.aboutPage =
          routerName === '/about/privacy' ||
          routerName === '/about/termsandconditions' ||
          routerName === '/auth/welcome' ||
          routerName === '/auth/login' ||
          routerName === '/auth/register' ||
          routerName === '/auth/registerconfrom';
      }
    });
  }

  ngOnInit() {
    // 🔥 Save subscription to destroy later
    this.headerScrollSub = this.headerService.getScrollPosition().subscribe((visible: boolean) => {
      this.isHeaderVisible = visible;
    });
  }

  // 🧹 CLEANUP — prevents memory leaks
  ngOnDestroy() {
    if (this.routerSub) this.routerSub.unsubscribe();
    if (this.headerScrollSub) this.headerScrollSub.unsubscribe();
    console.log('AppComponent destroyed → subscriptions cleaned');
  }
}
