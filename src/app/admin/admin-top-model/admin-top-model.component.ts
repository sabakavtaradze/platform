import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AdminProfession, AdminProfessionsService } from '../services/admin-professions.service';

@Component({
    selector: 'app-admin-top-model',
    templateUrl: './admin-top-model.component.html',
    styleUrls: ['./admin-top-model.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
    ],
})
export class AdminTopModelComponent implements OnInit {
    form: FormGroup;
    professions: AdminProfession[] = [];
    loading = false;
    saving = false;
    deletingIds = new Set<number>();
    error?: string;

    constructor(private fb: FormBuilder, private service: AdminProfessionsService) {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(60)]],
        });
    }

    ngOnInit(): void {
        this.loadProfessions();
    }

    private loadProfessions(): void {
        this.error = undefined;
        this.loading = true;
        this.service.getAll().subscribe({
            next: (data) => {
                this.professions = data;
                this.loading = false;
            },
            error: (err) => {
                this.loading = false;
                this.error = err?.message ?? 'Unable to load professions';
            },
        });
    }

    submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.saving = true;
        const nameControl = this.form.controls['name'];
        const name = (nameControl.value ?? '').trim();
        this.service.create({ name }).subscribe({
            next: () => {
                this.toolReset();
                this.loadProfessions();
            },
            error: (err) => {
                this.saving = false;
                this.error = err?.message ?? 'Failed to create profession';
            },
        });
    }

    confirmDelete(profession: AdminProfession): void {
        const targetLabel = profession.name ? `"${profession.name}"` : 'this profession';
        const shouldDelete = window.confirm(`Are you sure you want to delete ${targetLabel}?`);
        if (!shouldDelete) {
            return;
        }
        this.delete(profession);
    }

    private delete(profession: AdminProfession): void {
        const id = profession.professionId;
        if (!id || this.deletingIds.has(id)) {
            return;
        }
        this.deletingIds.add(id);
        this.service.delete(id).subscribe({
            next: () => {
                this.deletingIds.delete(id);
                this.professions = this.professions.filter((item) => item.professionId !== id);
            },
            error: (err) => {
                this.deletingIds.delete(id);
                this.error = err?.message ?? 'Failed to delete';
            },
        });
    }

    get canSubmit(): boolean {
        return this.form.valid && !this.saving;
    }

    private toolReset(): void {
        this.saving = false;
        this.form.reset();
    }
}
