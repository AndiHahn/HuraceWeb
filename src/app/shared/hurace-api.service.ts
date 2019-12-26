import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skier } from './skier';
import { environment } from 'src/environments/environment';

import { map, catchError, retry } from 'rxjs/operators';
import { Country } from './country';
import { RaceApi } from './race-api';
import { ResultApi } from './result-api';
import { StartlistEntry } from './startlist-entry';

@Injectable({
  providedIn: 'root'
})
export class HuraceApiService {

    constructor(private http: HttpClient) { }

    private errorHandler(error: Error | any): Observable<any> {
        return Observable.throw(error);
    }

    getAllRace(): Observable<RaceApi[]> {
        return this.http.get<RaceApi[]>(`${environment.server}/race`)
            .pipe(catchError(this.errorHandler));
    }

    getAllCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(`${environment.server}/country`)
            .pipe(catchError(this.errorHandler));
    }

    getAllSkier(): Observable<Skier[]> {
        return this.http.get<Skier[]>(`${environment.server}/skier`)
            .pipe(catchError(this.errorHandler));
    }

    getSkierById(id: number): Observable<Skier> {
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

    deleteSkier(id: number): Observable<any> {
        return this.http.delete<Skier>(`${environment.server}/skier/${id}`)
            .pipe(catchError(this.errorHandler));
    }

    getAllSearch(searchTerm: string): Observable<Skier[]> {
        return this.http.get<Skier[]>(`${environment.server}/skiersearch/${searchTerm}`)
            .pipe(retry(3), catchError(this.errorHandler));
    }

    getResults(raceid: number, run: number): Observable<ResultApi[]> {
        return this.http.get<ResultApi[]>(`${environment.server}/race/result/${raceid}/${run}`)
            .pipe(catchError(this.errorHandler));
    }

    //LIVE

    getLiveRace(): Observable<RaceApi> {
        return this.http.get<RaceApi>(`${environment.server}/live/race`)
            .pipe(catchError(this.errorHandler));
    }

    getLiveResults(): Observable<ResultApi[]> {
        return this.http.get<ResultApi[]>(`${environment.server}/live/result`)
            .pipe(catchError(this.errorHandler));
    }

    getLiveStartlist(): Observable<StartlistEntry[]> {
        return this.http.get<StartlistEntry[]>(`${environment.server}/live/startlist`)
            .pipe(catchError(this.errorHandler));
    }

    getCurrentSkier(): Observable<Skier> {
        return this.http.get<Skier>(`${environment.server}/live/currentSkier`)
            .pipe(catchError(this.errorHandler));
    }

    getNextSkier(): Observable<Skier> {
        return this.http.get<Skier>(`${environment.server}/live/nextSkier`)
            .pipe(catchError(this.errorHandler));
    }

    getLastSkier(): Observable<Skier> {
        return this.http.get<Skier>(`${environment.server}/live/lastSkier`)
            .pipe(catchError(this.errorHandler));
    }
}
