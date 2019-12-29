import { Component, OnInit } from '@angular/core';
import { Skier } from '../shared/skier';
import { RaceApi } from '../shared/race-api';
import { StartlistEntry } from '../shared/startlist-entry';
import { Result } from '../shared/result';
import { Subscription, interval } from 'rxjs';
import { HuraceLiveApiService } from '../shared/hurace-live-api.service';
import { Intermediate } from '../shared/intermediate';
import { ResultApi } from '../shared/result-api';
import { HuraceDataApiService } from '../shared/hurace-data-api.service';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: []
})
export class LiveComponent implements OnInit {

    isLive: boolean = false;
    isLoggedIn: boolean = false;

    currentSkier: Skier;
    currentAllResults: number[];

    lastSkier: Skier;
    lastAllResults: number[];

    nextSkier: Skier;
    nextAllResults: number[];
    
    results: Result[] = [];
    furherStartlist: StartlistEntry[] = []; 
    fullStartlist: StartlistEntry[] = [];
    
    race: RaceApi;

    currentIntermediate: Intermediate;
    resultLastSkier: ResultApi;

    cyclicSubscription: Subscription;
    
    constructor(private hs: HuraceLiveApiService,
                private hds: HuraceDataApiService,
                private auth: AuthService) { }
    
    ngOnInit() {
        this.hs.isLive.subscribe(res => {
            this.isLive = res;

            this.startCyclicSubscription();
        });

        this.auth.authState.subscribe(user => this.isLoggedIn = user != null);
    }

    ngOnDestroy() {
        if (this.cyclicSubscription != null) {
            this.cyclicSubscription.unsubscribe();
        }
        this.cyclicSubscription = null;
    }

    startCyclicSubscription() {
        if (this.isLive && this.cyclicSubscription == null ||
            (this.isLive && this.cyclicSubscription != null && this.cyclicSubscription.closed)) {
            this.loadRace();
            this.cyclicSubscription = interval(2000)
                .subscribe(res => this.refresh());
        } else if (!this.isLive) {
            if (this.cyclicSubscription != null) {
                this.cyclicSubscription.unsubscribe();
            }
        }
    }

    loadRace() {
        //get live race - check if 
        this.hs.getLiveRace().subscribe(res => this.race = res);
    }

    refresh() {
        this.hs.getCurrentSkier().subscribe(res => this.currentSkier = res);
        this.hs.getLastSkier().subscribe(res => this.lastSkier = res);
        this.hs.getNextSkier().subscribe(res => this.nextSkier = res);

        this.getAllLastResults();
        
        this.hs.getLiveResults()
            .subscribe(res => {
                this.results = [];
                res.map((result) => {
                    let timeString = "";
                    if (result.status == "OK") {
                        if (result.ordinal == 1) {
                            timeString = result.time;
                        } else {
                            timeString = "+ " + result.residue;
                        }
                    } else {
                        timeString = result.status;
                    }
                    let newResult = new Result(result.ordinal, 
                                                result.countryImgUrl, 
                                                result.name, 
                                                timeString);
                    this.results.push(newResult);
                })
            });
        
        //load Startlist
        this.hs.getLiveStartlist().subscribe(res => {
            this.fullStartlist = res;
            this.furherStartlist = this.fullStartlist;

            //update further Startlist
            if (this.currentSkier != null) {
                let actStartpos = this.getStartpositionBySkier(this.currentSkier.id);
                this.furherStartlist.forEach(item => {
                    if (item.ordinal <= actStartpos) {
                        item.ordinal = 0;
                    }
                });
            }
        });

        //get intermediate time
        this.hs.getCurrentIntermediate().subscribe(res => this.currentIntermediate = res);
        this.hs.getLastResult().subscribe(res => this.resultLastSkier = res);
    }
    
    getStartpositionBySkier(id: number): number {
        let index = 0;
        let foundSkier = false;
        this.fullStartlist.forEach(item => {
            if (!foundSkier) index++;
            if (item.skier.id == id) {
                foundSkier = true;
            }
        })
        return index;
    }

    timespanIsMinus(time: string): boolean {
        return time.charAt(0) == "-";
    }

    getAllLastResults() {
        if (this.nextSkier != null) {
            this.hds.getAllResultsForSkier(this.nextSkier.id)
                .subscribe(res => {
                    this.nextAllResults = [];
                    res.map(result => {
                        if (result.ordinal > 0) {
                            this.nextAllResults.push(result.ordinal);
                        }
                    });
                });
        } else {
            this.nextAllResults = [];
        }

        if (this.currentSkier != null) {
            this.hds.getAllResultsForSkier(this.currentSkier.id)
                .subscribe(res => {
                    this.currentAllResults = [];
                    res.map(result => {
                        if (result.ordinal > 0) {
                            this.currentAllResults.push(result.ordinal);
                        }
                    });
                });
        } else {
            this.currentAllResults = [];
        }

        if (this.lastSkier != null) {
            this.hds.getAllResultsForSkier(this.lastSkier.id)
                .subscribe(res => {
                    this.lastAllResults = [];
                    res.map(result => {
                        if (result.ordinal > 0) {
                            this.lastAllResults.push(result.ordinal);
                        }
                    });
                });
        } else {
            this.lastAllResults = [];
        }
    }
}
