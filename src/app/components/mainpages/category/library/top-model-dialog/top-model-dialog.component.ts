import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import heic2any from 'heic2any';
import { finalize } from 'rxjs/operators';
import { TopModelService } from 'src/app/services/top-model.service';

@Component({
    selector: 'app-top-model-dialog',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './top-model-dialog.component.html',
    styleUrls: ['./top-model-dialog.component.scss'],
})
export class TopModelDialogComponent implements OnInit {
    selectedFile: File | null = null;
    convertedFile: File | null = null;
    loading = false;
    error: string | null = null;
    previewUrl: string | ArrayBuffer | null = null;
    private readonly defaultProfessions = ['acter', 'reporter', 'Tv', 'gamer'];
    availableProfessions: string[] = [...this.defaultProfessions];
    selectedProfessions: string[] = [];

    @ViewChild('photoInput') photoInput?: ElementRef<HTMLInputElement>;

    constructor(
        private dialogRef: MatDialogRef<TopModelDialogComponent>,
        private topModelService: TopModelService
    ) { }

    ngOnInit(): void {
        this.loadProfessions();
    }

    private loadProfessions(): void {
        this.topModelService.getProfessions().subscribe({
            next: (professions) => {
                this.availableProfessions = professions.length ? professions : this.defaultProfessions;
            },
            error: () => {
                this.availableProfessions = [...this.defaultProfessions];
            },
        });
    }

    toggleProfession(profession: string): void {
        if (this.selectedProfessions.includes(profession)) {
            this.selectedProfessions = this.selectedProfessions.filter((item) => item !== profession);
        } else {
            this.selectedProfessions = [...this.selectedProfessions, profession];
        }
    }

    async onFileSelected(event: Event): Promise<void> {
        const input = event.target as HTMLInputElement;
        const file = input?.files?.[0] ?? null;
        if (!file) {
            this.clearSelection();
            return;
        }

        this.selectedFile = file;
        this.error = null;
        this.previewUrl = null;

        try {
            const jpegBase64 = await this.convertToJpegBase64(file);
            this.previewUrl = jpegBase64;
            const jpegBlob = await (await fetch(jpegBase64)).blob();
            this.convertedFile = new File([jpegBlob], `${file.name}.jpg`, { type: 'image/jpeg' });
        } catch (error) {
            console.error('Image preprocessing failed', error);
            this.error = 'Unable to prepare the image. Try another photo.';
            this.convertedFile = null;
        }
    }

    cancel(): void {
        this.clearSelection();
        this.dialogRef.close(false);
    }

    submit(): void {
        const fileToUpload = this.convertedFile ?? this.selectedFile;
        if (!fileToUpload) {
            this.error = 'Please pick a picture file before submitting.';
            return;
        }

        const professionsToSend = this.getSelectedProfessions();
        this.loading = true;
        this.topModelService
            .createTopModel(fileToUpload, professionsToSend)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe({
                next: () => this.dialogRef.close(true),
                error: (err) => {
                    this.error = err?.error?.errorMessage || err?.message || 'Upload failed';
                },
            });
    }

    clearSelection(): void {
        this.selectedFile = null;
        this.convertedFile = null;
        this.previewUrl = null;
        this.error = null;
        if (this.photoInput) {
            this.photoInput.nativeElement.value = '';
        }
    }

    private async convertToJpegBase64(file: File): Promise<string> {
        try {
            if (this.isHeicFile(file)) {
                const jpegBlob = (await heic2any({
                    blob: file,
                    toType: 'image/jpeg',
                    quality: 0.9,
                })) as Blob;

                return await this.blobToBase64(jpegBlob);
            }

            const bitmap = await createImageBitmap(file);
            const canvas = document.createElement('canvas');
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;

            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Canvas error');
            ctx.drawImage(bitmap, 0, 0);

            return canvas.toDataURL('image/jpeg', 0.9);
        } catch (err) {
            console.warn('Fallback convert used', err);

            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;

                        const ctx = canvas.getContext('2d');
                        if (!ctx) return reject('Canvas error');
                        ctx.drawImage(img, 0, 0);

                        resolve(canvas.toDataURL('image/jpeg', 0.9));
                    };
                    img.onerror = () => reject('Image load error');
                    img.src = e.target.result;
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }
    }

    private isHeicFile(file: File): boolean {
        const type = file.type?.toLowerCase() ?? '';
        const name = file.name?.toLowerCase() ?? '';
        return type.includes('heic') || type.includes('heif') || name.endsWith('.heic');
    }

    private blobToBase64(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    private getSelectedProfessions(): string[] {
        return this.selectedProfessions
            .map((profession) => profession?.trim())
            .filter((profession, index, self): profession is string => Boolean(profession) && self.indexOf(profession) === index);
    }
}
