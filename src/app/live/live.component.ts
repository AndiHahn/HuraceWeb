import { Component, OnInit } from '@angular/core';
import { Skier } from '../shared/skier';
import { RaceApi } from '../shared/race-api';
import { HuraceApiService } from '../shared/hurace-api.service';
import { StartlistEntry } from '../shared/startlist-entry';
import { Result } from '../shared/result';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {

    currentSkier: Skier;
    lastSkier: Skier;
    nextSkier: Skier;
    
    results: Result[] = [];
    furherStartlist: StartlistEntry[] = []; 
    fullStartlist: StartlistEntry[] = [];
    
    race: RaceApi;

    cyclicSubscription: Subscription;
    
    constructor(private hs: HuraceApiService) { }
    
    ngOnInit() {
        //get live race - check if 
        this.hs.getLiveRace().subscribe(res => this.race = res);
        this.hs.getLiveStartlist().subscribe(res => {
            this.fullStartlist = res;
            this.furherStartlist = this.fullStartlist;
        });

        this.refresh();

        //cyclic refresh
        this.cyclicSubscription = interval(1000)
            .subscribe(res => this.refresh());
    }

    refresh() {
        this.hs.getCurrentSkier().subscribe(res => this.currentSkier = res);
        this.hs.getLastSkier().subscribe(res => this.lastSkier = res);
        this.hs.getNextSkier().subscribe(res => this.nextSkier = res);

        this.results = [];
        this.hs.getLiveResults()
            .subscribe(res => {
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
        console.log("return index: " + index);
        return index;
    }
}
