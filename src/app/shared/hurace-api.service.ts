import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Skier } from './skier';
import { environment } from 'src/environments/environment';

import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HuraceApiService {

    constructor(private http: HttpClient) { }

    private errorHandler(error: Error | any): Observable<any> {
        return Observable.throw(error);
    }

    getAllSkier(): Observable<Skier[]> {
        return this.http.get<Skier[]>(`${environment.server}/skier`)
            .pipe(catchError(this.errorHandler));
    }

    getSkierById(id): Observable<Skier> {
        return this.http.get<Skier>(`${environment.server}/skier/${id}`)
            .pipe(catchError(this.errorHandler));
    }
}
