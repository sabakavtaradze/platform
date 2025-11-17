import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AdminPostListComponent } from './admin-post-list/admin-post-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [AdminComponent, AdminPostListComponent],
  imports: [CommonModule, AdminRoutingModule, MatButtonModule, MatInputModule],
})
export class AdminModule { }
