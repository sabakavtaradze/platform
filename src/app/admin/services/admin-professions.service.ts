import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponse } from 'src/app/interfaces/ResponseInterface/BaseResponse';
import { environment } from 'src/environments/environment';

export interface AdminProfession {
    professionId: number;
    name: string;
}

export interface CreateProfessionDTO {
    name: string;
}

@Injectable({ providedIn: 'root' })
export class AdminProfessionsService {
    private readonly baseUrl = `${environment.apiUrl}/api/admin/professions`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<AdminProfession[]> {
        return this.http
            .get<BaseResponse<AdminProfession[]>>(`${this.baseUrl}`)
            .pipe(map((response) => response?.data ?? []));
    }

    create(dto: CreateProfessionDTO): Observable<AdminProfession> {
        return this.http
            .post<BaseResponse<AdminProfession>>(`${this.baseUrl}/create`, dto)
            .pipe(map((response) => response?.data));
    }

    delete(id: number): Observable<boolean> {
        return this.http
            .delete<BaseResponse<boolean>>(`${this.baseUrl}/${id}`)
            .pipe(map((response) => response?.data ?? false));
    }
}
