import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../app/components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import('../app/components/mainpages/mainpages.module').then(m => m.MainpagesModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('../app/components/chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'about',
    loadChildren: () => import('../app/components/aboutpage/aboutpage.module').then(m => m.AboutpageModule)
  },
  {
    path: '**',
    loadChildren: () => import('../app/components/mainpages/mainpages.module').then(m => m.MainpagesModule)
  }, 

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule { }
