import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../guards/admin.guard';
import { AdminPostListComponent } from './admin-post-list/admin-post-list.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [adminGuard],
    component: AdminComponent,
    children: [
      {
        path: 'posts',
        component: AdminPostListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
