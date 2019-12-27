import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, BehaviorSubject, Subscription, interval } from 'rxjs';
import { RaceApi } from './race-api';
import { environment } from 'src/environments/environment';
import { ResultApi } from './result-api';
import { catchError } from 'rxjs/operators';
import { StartlistEntry } from './startlist-entry';
import { Skier } from './skier';

@Injectable({
  providedIn: 'root'
})
export class HuraceLiveApiService {

    //private testReplay;    
    //readonly isLive: Observable<boolean>;
    readonly isLive = new BehaviorSubject<boolean>(false);
    private updateLiveStateSubscription: Subscription;

    constructor(private http: HttpClient) { 
        this.updateLiveStateSubscription = interval(5000).subscribe(
            res => this.updateLiveState()
        );
    }

    updateLiveState() {
        this.checkIsLive().subscribe(res => {
            if (res == true) {
                this.isLive.next(true);
            } else {
                this.isLive.next(false);
            }
        });
    }
    
    private errorHandler(error: Error | any): Observable<any> {
        return Observable.throw(error);
    }

    checkIsLive(): Observable<boolean> {
        return this.http.get<boolean>(`${environment.server}/live/isLive`)
            .pipe(catchError(this.errorHandler));
    }

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
