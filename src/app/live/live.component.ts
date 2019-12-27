import { Component, OnInit } from '@angular/core';
import { Skier } from '../shared/skier';
import { RaceApi } from '../shared/race-api';
import { StartlistEntry } from '../shared/startlist-entry';
import { Result } from '../shared/result';
import { Subscription, interval } from 'rxjs';
import { HuraceLiveApiService } from '../shared/hurace-live-api.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {

    isLive: boolean = false;

    currentSkier: Skier;
    lastSkier: Skier;
    nextSkier: Skier;
    
    results: Result[] = [];
    furherStartlist: StartlistEntry[] = []; 
    fullStartlist: StartlistEntry[] = [];
    
    race: RaceApi;

    cyclicSubscription: Subscription;
    
    constructor(private hs: HuraceLiveApiService) { }
    
    ngOnInit() {
        this.hs.isLive.subscribe(res => {
            this.isLive = res;

            this.startCyclicSubscription();
        });
    }

    ngOnDestroy() {
        if (this.cyclicSubscription != null) {
            this.cyclicSubscription.unsubscribe();
        }
    }

    loadRace() {
        //get live race - check if 
        this.hs.getLiveRace().subscribe(res => this.race = res);
        this.hs.getLiveStartlist().subscribe(res => {
            this.fullStartlist = res;
            this.furherStartlist = this.fullStartlist;
        });
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

    refresh() {
        this.hs.getCurrentSkier().subscribe(res => this.currentSkier = res);
        this.hs.getLastSkier().subscribe(res => this.lastSkier = res);
        this.hs.getNextSkier().subscribe(res => this.nextSkier = res);

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
        
        //update further Startlist
        if (this.currentSkier != null) {
            let actStartpos = this.getStartpositionBySkier(this.currentSkier.id);
            this.furherStartlist.forEach(item => {
                if (item.ordinal <= actStartpos) {
                    item.ordinal = 0;
                }
            });
        }
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
}
