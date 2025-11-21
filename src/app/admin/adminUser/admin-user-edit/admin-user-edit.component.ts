import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Optional, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminUsersService } from '../../services/admin-users.service';

@Component({
    selector: 'app-admin-user-edit',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './admin-user-edit.component.html',
    styleUrls: ['./admin-user-edit.component.scss'],
})
export class AdminUserEditComponent implements OnChanges, OnInit {
    @Input() user: any | null = null;
    @Output() saved = new EventEmitter<void>();
    @Output() cancelled = new EventEmitter<void>();

    loading = false;
    error: string | null = null;

    form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [''],
        isAdmin: [false],
    });

    constructor(
        private fb: FormBuilder,
        private adminUsers: AdminUsersService,
        @Optional() @Inject(MAT_DIALOG_DATA) private dialogData?: { user?: any },
        @Optional() private dialogRef?: MatDialogRef<AdminUserEditComponent>,
    ) { }

    ngOnInit(): void {
        if (this.dialogData?.user) {
            this.applyUser(this.dialogData.user);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const userChange = changes['user'];
        if (!userChange?.currentValue) {
            return;
        }
        this.applyUser(userChange.currentValue);
    }

    submit(): void {
        if (!this.user) return;
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.loading = true;
        this.error = null;

        const payload: any = {
            UserFirstname: this.form.value.firstName?.trim(),
            UserLastname: this.form.value.lastName?.trim(),
            UserEmail: this.form.value.email?.trim(),
            IsAdmin: !!this.form.value.isAdmin,
        };

        const passwordValue = (this.form.value.password ?? '').toString().trim();
        if (passwordValue) {
            payload.UserPassword = passwordValue;
        }

        const userId = this.user.userID ?? this.user.id ?? this.user.userId;
        if (!userId) {
            this.error = 'Cannot determine user ID';
            this.loading = false;
            return;
        }

        this.adminUsers.updateUser(userId, payload).subscribe({
            next: (response) => {
                if (response?.isSuccess) {
                    this.form.reset();
                    this.saved.emit();
                    this.dialogRef?.close(true);
                } else {
                    this.error = response?.errorMessage || 'Failed to update user';
                }
            },
            error: (err) => {
                this.error = err?.message || 'Failed to update user';
            },
            complete: () => (this.loading = false),
        });
    }

    cancel(): void {
        this.cancelled.emit();
        this.dialogRef?.close(false);
    }

    private applyUser(user: any): void {
        this.user = user;
        this.form.patchValue({
            firstName: user.userFirstName ?? user.userFirstname ?? '',
            lastName: user.userLastName ?? user.userLastname ?? '',
            email: user.userEmail ?? user.email ?? '',
            isAdmin: !!(user.userRole === 'Admin' || user.IsAdmin || user.isAdmin),
            password: '',
        });
        this.form.markAsPristine();
    }
}

