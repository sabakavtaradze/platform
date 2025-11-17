import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { finalize } from 'rxjs/operators';
import { MainpagesModule } from 'src/app/components/mainpages/mainpages.module';
import { AdminPostsComponent } from "../adminPostList/admin-posts/admin-posts.component";
import { AdminPostsService } from '../services/admin-posts.service';

@Component({
    selector: 'app-admin-post-list',
    templateUrl: './admin-post-list.component.html',
    styleUrls: ['./admin-post-list.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MainpagesModule, AdminPostsComponent]
})
export class AdminPostListComponent {
    form: FormGroup;
    loading = false;
    error: string | null = null;
    results: any[] | null = null;
    posts: any;
    constructor(private fb: FormBuilder, private adminPosts: AdminPostsService) {
        this.form = this.fb.group({
            q: ['', [Validators.required, Validators.minLength(1)]],
        });
    }

    submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const q = (this.form.value.q ?? '').toString().trim();
        if (!q) return;
        this.loading = true;
        this.error = null;
        this.results = null;
        this.adminPosts
            .search(q)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe({
                next: (res: any) => {
                    // Normalize backend responses to an array for rendering
                    // Supports: [items] | { data: [items] } | { data: item } | item
                    const data = Array.isArray(res)
                        ? res
                        : Array.isArray(res?.data)
                            ? res.data
                            : res?.data
                                ? [res.data]
                                : res
                                    ? [res]
                                    : [];
                    this.results = Array.isArray(res) ? res : [res];
                    this.posts = data;
                },
                error: (err: any) => {
                    this.error = err?.message || 'Search failed';
                },
            });
    }


    removePostFromList(postId: number) {
        this.posts = this.posts.filter((p: any) => p.postID !== postId);
    }
}
