import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminUsersService } from '../services/admin-users.service';
import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';

@Component({
    selector: 'app-admin-user',
    standalone: true,
    templateUrl: './admin-user.component.html',
    styleUrls: ['./admin-user.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        AdminUserListComponent,
    ],
})
export class AdminUserComponent implements OnInit {
    searchForm = this.fb.group({ q: [''] });
    users: any[] = [];
    loading = false;
    error: string | null = null;
    selectedUserId: number | null = null;

    constructor(
        private fb: FormBuilder,
        private adminUsers: AdminUsersService,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.setLoading(true);
        this.error = null;
        this.adminUsers.getAllUsers().subscribe({
            next: (res) => this.handleResponse(res),
            error: (err) => {
                this.error = err?.message || 'Failed to load users';
                this.setLoading(false);
            },
            complete: () => this.setLoading(false),
        });
    }

    search(): void {
        const query = this.getSearchQuery();
        if (!query) {
            this.loadUsers();
            return;
        }
        this.setLoading(true);
        this.error = null;
        this.adminUsers.searchUsers(query).subscribe({
            next: (res) => this.handleResponse(res),
            error: (err) => {
                this.error = err?.message || 'Search failed';
                this.setLoading(false);
            },
            complete: () => this.setLoading(false),
        });
    }

    handleDelete(userId: number): void {
        this.setLoading(true);
        this.adminUsers.deleteUser(userId).subscribe({
            next: () => this.loadUsers(),
            error: (err) => {
                this.error = err?.message || 'Failed to delete user';
                this.setLoading(false);
            },
        });
    }

    refresh(): void {
        this.searchForm.reset();
        this.loadUsers();
    }

    handleEdit(user: any): void {
        this.selectedUserId = this.extractUserId(user);
        const dialogRef = this.dialog.open(AdminUserEditComponent, {
            width: '100%',
            maxWidth: '480px',
            panelClass: 'full-width-dialog',
            data: { user },
        });

        dialogRef.afterClosed().subscribe((saved: boolean) => {
            this.selectedUserId = null;
            if (saved) {
                this.loadUsers();
            }
        });
    }

    private extractUserId(user: any): number | null {
        return (user?.userID ?? user?.id ?? user?.userId ?? null) as number | null;
    }

    private handleResponse(res: any): void {
        if (res?.isSuccess === false) {
            this.error = res.errorMessage || 'No users found';
            this.users = [];
            return;
        }
        const payload = res?.data ?? res ?? [];
        const list = Array.isArray(payload) ? payload : payload?.users ?? [];
        this.users = list;
    }

    private getSearchQuery(): string {
        return (this.searchForm.get('q')?.value ?? '').toString().trim();
    }

    private setLoading(value: boolean): void {
        this.loading = value;
        const control = this.searchForm.get('q');
        if (!control) {
            return;
        }
        if (value && control.enabled) {
            control.disable({ emitEvent: false });
        } else if (!value && control.disabled) {
            control.enable({ emitEvent: false });
        }
    }
}