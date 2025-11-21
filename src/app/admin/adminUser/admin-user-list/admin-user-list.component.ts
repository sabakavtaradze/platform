import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss'],
})
export class AdminUserListComponent {
  @Input() users: any[] = [];
  @Input() loading = false;
  @Input() activeUserId: number | null = null;
  @Output() deleteUser = new EventEmitter<number>();
  @Output() editUser = new EventEmitter<any>();

  isActive(user: any): boolean {
    const id = user?.userID ?? user?.id ?? user?.userId;
    return id != null && id === this.activeUserId;
  }
}
