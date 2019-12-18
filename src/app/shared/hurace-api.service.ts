import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Skier } from './skier';
import { environment } from 'src/environments/environment';

import { map, catchError, retry } from 'rxjs/operators';
import { Country } from './country';

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

    getAllCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(`${environment.server}/country`)
            .pipe(catchError(this.errorHandler));
    }

    getSkierById(id): Observable<Skier> {
        return this.http.get<Skier>(`${environment.server}/skier/${id}`)
            .pipe(catchError(this.errorHandler));
    }

    updateSkier(skier: Skier): Observable<any> {
        return this.http.put<any>(`${environment.server}/skier`, skier)
            .pipe(catchError(this.errorHandler));
    }

    addSkier(skier: Skier): Observable<any> {
        return this.http.post<any>(`${environment.server}/skier`, skier)
            .pipe(catchError(this.errorHandler));
    }
}
