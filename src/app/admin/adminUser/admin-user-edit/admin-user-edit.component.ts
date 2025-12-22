import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Output, SimpleChanges } from '@angular/core';
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
        NgIf,
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
export class AdminUserEditComponent implements OnChanges, OnInit, OnDestroy {
    @Input() user: any | null = null;
    @Output() saved = new EventEmitter<void>();
    @Output() cancelled = new EventEmitter<void>();

    loading = false;
    error: string | null = null;
    profilePreviewUrl: string | null = null;
    coverPreviewUrl: string | null = null;
    private profilePreviewObjectUrl: string | null = null;
    private coverPreviewObjectUrl: string | null = null;
    private pendingProfileImage: File | null = null;
    private pendingCoverImage: File | null = null;

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

    ngOnDestroy(): void {
        this.revokePreview('profile');
        this.revokePreview('cover');
    }

    submit(): void {
        if (!this.user) return;
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.loading = true;
        this.error = null;

        const formData = new FormData();
        formData.append('UserFirstname', (this.form.value.firstName ?? '').toString().trim());
        formData.append('UserLastname', (this.form.value.lastName ?? '').toString().trim());
        formData.append('UserEmail', (this.form.value.email ?? '').toString().trim());
        formData.append('UserPassword', (this.form.value.password ?? '').toString().trim());
        formData.append('IsAdmin', this.form.value.isAdmin ? 'true' : 'false');
        if (this.pendingProfileImage) {
            formData.append('ProfileImage', this.pendingProfileImage);
        }
        if (this.pendingCoverImage) {
            formData.append('CoverImage', this.pendingCoverImage);
        }

        const userId = this.user.userID ?? this.user.id ?? this.user.userId;
        if (!userId) {
            this.error = 'Cannot determine user ID';
            this.loading = false;
            return;
        }

        this.adminUsers.updateUser(userId, formData).subscribe({
            next: (response) => {
                if (response?.isSuccess) {
                    this.form.reset();
                    this.pendingProfileImage = null;
                    this.pendingCoverImage = null;
                    this.saved.emit();
                    this.dialogRef?.close(true);
                } else {
                    this.error = response?.errorMessage || 'Failed to update user';
                }
            },
            error: (err) => {
                console.error('Admin user update failed', err);
                this.error =
                    err?.error?.errorMessage ||
                    err?.error?.message ||
                    err?.message ||
                    'Failed to update user';
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
        this.revokePreview('profile');
        this.revokePreview('cover');
        this.profilePreviewUrl = user.userProfilePictureUrl ?? null;
        this.coverPreviewUrl = user.userCoverPictureUrl ?? null;
        this.pendingProfileImage = null;
        this.pendingCoverImage = null;
    }

    onImageChange(event: Event, target: 'profile' | 'cover'): void {
        const file = this.extractFileFromEvent(event);
        if (!file) {
            return;
        }

        if (target === 'profile') {
            this.pendingProfileImage = file;
            this.setPreview('profile', URL.createObjectURL(file));
        } else {
            this.pendingCoverImage = file;
            this.setPreview('cover', URL.createObjectURL(file));
        }
    }

    private setPreview(target: 'profile' | 'cover', url: string): void {
        this.revokePreview(target);
        if (target === 'profile') {
            this.profilePreviewObjectUrl = url;
            this.profilePreviewUrl = url;
        } else {
            this.coverPreviewObjectUrl = url;
            this.coverPreviewUrl = url;
        }
    }

    private revokePreview(target: 'profile' | 'cover'): void {
        if (target === 'profile' && this.profilePreviewObjectUrl) {
            URL.revokeObjectURL(this.profilePreviewObjectUrl);
            this.profilePreviewObjectUrl = null;
        }
        if (target === 'cover' && this.coverPreviewObjectUrl) {
            URL.revokeObjectURL(this.coverPreviewObjectUrl);
            this.coverPreviewObjectUrl = null;
        }
    }

    private extractFileFromEvent(event: Event): File | null {
        const input = event.target as HTMLInputElement | null;
        const file = input?.files?.[0] ?? null;
        if (input) {
            input.value = '';
        }
        return file;
    }

    private getUserId(): number | null {
        return (this.user?.userID ?? this.user?.id ?? this.user?.userId ?? null) as number | null;
    }

}

