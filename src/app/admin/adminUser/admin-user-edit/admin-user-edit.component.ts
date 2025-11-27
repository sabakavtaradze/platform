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
    uploadingProfilePicture = false;
    uploadingCoverPicture = false;
    profilePreviewUrl: string | null = null;
    coverPreviewUrl: string | null = null;
    private profilePreviewObjectUrl: string | null = null;
    private coverPreviewObjectUrl: string | null = null;

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
        this.revokePreview('profile');
        this.revokePreview('cover');
        this.profilePreviewUrl = user.userProfilePictureUrl ?? null;
        this.coverPreviewUrl = user.userCoverPictureUrl ?? null;
    }

    onImageChange(event: Event, target: 'profile' | 'cover'): void {
        const file = this.extractFileFromEvent(event);
        if (!file) {
            return;
        }

        if (target === 'profile') {
            this.uploadingProfilePicture = true;
            this.setPreview('profile', URL.createObjectURL(file));
        } else {
            this.uploadingCoverPicture = true;
            this.setPreview('cover', URL.createObjectURL(file));
        }

        this.uploadImage(file, target);
    }

    private uploadImage(file: File, target: 'profile' | 'cover'): void {
        const userId = this.getUserId();
        if (!userId) {
            this.assignImageError(target, 'Unable to identify the user.');
            this.clearUploadFlag(target);
            return;
        }

        const upload$ = target === 'profile'
            ? this.adminUsers.uploadProfilePicture(userId, file)
            : this.adminUsers.uploadCoverPicture(userId, file);

        upload$.subscribe({
            next: (response) => {
                const updatedUser = response?.data ?? response;
                if (target === 'profile' && updatedUser?.userProfilePictureUrl) {
                    this.revokePreview('profile');
                    this.profilePreviewUrl = updatedUser.userProfilePictureUrl;
                    this.user = { ...this.user, userProfilePictureUrl: updatedUser.userProfilePictureUrl };
                }
                if (target === 'cover' && updatedUser?.userCoverPictureUrl) {
                    this.revokePreview('cover');
                    this.coverPreviewUrl = updatedUser.userCoverPictureUrl;
                    this.user = { ...this.user, userCoverPictureUrl: updatedUser.userCoverPictureUrl };
                }
            },
            error: (err) => {
                this.assignImageError(target, err?.message || 'Unable to upload image.');
                this.clearUploadFlag(target);
            },
            complete: () => this.clearUploadFlag(target),
        });
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

    private assignImageError(target: 'profile' | 'cover', message: string): void {
        this.error = `Failed to upload ${target} image: ${message}`;
    }

    private clearUploadFlag(target: 'profile' | 'cover'): void {
        if (target === 'profile') {
            this.uploadingProfilePicture = false;
        } else {
            this.uploadingCoverPicture = false;
        }
    }
}

