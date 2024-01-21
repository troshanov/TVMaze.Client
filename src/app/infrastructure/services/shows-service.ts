import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiUrl = "http://localhost:5059";

@Injectable({
    providedIn: 'root'
})

export class ShowsService{
    
    constructor(private client: HttpClient) {
    }

    getShows(size: number, page: number = 1): Observable<any> {
        return this.client.get<any>(`${apiUrl}/api/Shows?size=${size}&page=${page}`);
    }

    getShowCast(showId: number): Observable<any>{
        return this.client.get<any>(`${apiUrl}/api/Shows/Cast?id=${showId}`)
    }

    search(title: string, size: number, page: number = 1): Observable<any> {
        return this.client.get<any>(`${apiUrl}/api/Shows/Search?title=${title}&size=${size}&page=${page}`)
    }
}