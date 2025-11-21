import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminPostListComponent } from './admin-post-list/admin-post-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminPostsComponent } from './adminPostList/admin-posts/admin-posts.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminComponent,
    AdminPostListComponent,
    AdminPostsComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class AdminModule { }
