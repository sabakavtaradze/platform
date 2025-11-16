import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { AdminPostListComponent } from './admin-post-list/admin-post-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [AdminComponent, AdminPostListComponent],
  imports: [CommonModule, AdminRoutingModule, MatButtonModule],
})
export class AdminModule {}
