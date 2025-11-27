import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TopModelFilterRangeDTO, TopModelFilterRangeResponse, TopModelListItem } from 'src/app/interfaces/library/top-model';
import { BaseResponse } from 'src/app/interfaces/ResponseInterface/BaseResponse';
import { environment } from 'src/environments/environment';

interface ProfessionResponseItem {
    professionId: number;
    name: string;
}

@Injectable({ providedIn: 'root' })

export class TopModelService {
    constructor(private http: HttpClient) { }

    createTopModel(file: File, professionNames: string[] = []): Observable<any> {
        const payload = new FormData();
        payload.append('photo', file, file.name);
        payload.append('Photo', file, file.name);
        payload.append('file', file, file.name);
        payload.append('File', file, file.name);
        professionNames
            .filter((name) => name?.trim().length)
            .forEach((name) => payload.append('ProfessionNames', name));

        return this.http.post(`${environment.apiUrl}/api/TopModel/create-top-model`, payload);
    }

    getTopModelList(): Observable<TopModelListItem[]> {
        return this.http
            .get<BaseResponse<TopModelListItem[]>>(`${environment.apiUrl}/api/TopModel/list`)
            .pipe(map((response) => response?.data ?? []));
    }

    getFilterRanges(): Observable<TopModelFilterRangeResponse> {
        return this.http
            .get<BaseResponse<TopModelFilterRangeResponse>>(`${environment.apiUrl}/api/TopModel/filters`)
            .pipe(
                map((response) =>
                    response?.data ?? {
                        minAge: 18,
                        maxAge: 60,
                        minFollowers: 0,
                        maxFollowers: 0,
                        professions: [],
                    },
                ),
            );
    }

    filterTopModels(filter: TopModelFilterRangeDTO): Observable<TopModelListItem[]> {
        return this.http
            .post<BaseResponse<TopModelListItem[]>>(`${environment.apiUrl}/api/TopModel/filter`, filter)
            .pipe(map((response) => response?.data ?? []));
    }

    IsgetTopModelExists(): Observable<boolean> {
        return this.http
            .get<BaseResponse<boolean>>(`${environment.apiUrl}/api/TopModel/exists`)
            .pipe(map((response) => response?.data ?? false));
    }

    deleteTopModel(): Observable<boolean> {
        return this.http
            .delete<BaseResponse<boolean>>(`${environment.apiUrl}/api/TopModel/delete`)
            .pipe(map((response) => response?.data ?? false));
    }

    getProfessions(): Observable<string[]> {
        return this.http
            .get<BaseResponse<ProfessionResponseItem[]>>(`${environment.apiUrl}/api/professions`)
            .pipe(
                map((response) =>
                ((response?.data ?? [])
                    .map((profession) => profession.name?.trim())
                    .filter((name): name is string => Boolean(name))),
                ),
            );
    }
}
