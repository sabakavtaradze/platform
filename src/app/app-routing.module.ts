import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth/twitch',
    loadComponent: () =>
      import('./components/social/twitch-login/twitch-login.component').then((m) => m.TwitchLoginComponent),
  },
  {
    path: 'auth/twitch/callback',
    loadComponent: () =>
      import('./components/social/twitch-callback/twitch-callback.component').then((m) => m.TwitchCallbackComponent),
  },
  {
    path: 'tiktok/callback',
    loadComponent: () =>
      import('./components/social/tiktok-callback/tiktok-callback.component').then((m) => m.TikTokCallbackComponent),
  },
  {
    path: 'tiktok/connected',
    loadComponent: () =>
      import('./pages/tiktok-connected/tiktok-connected.component').then((m) => m.TikTokConnectedComponent),
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/components/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('../app/components/mainpages/mainpages.module').then((m) => m.MainpagesModule),
  },
  {
    path: 'chat',
    loadChildren: () => import('../app/components/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('../app/components/aboutpage/aboutpage.module').then((m) => m.AboutpageModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('../app/components/mainpages/mainpages.module').then((m) => m.MainpagesModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
