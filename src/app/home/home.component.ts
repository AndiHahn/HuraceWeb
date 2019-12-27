import { Component, OnInit } from '@angular/core';
import { RaceApi } from '../shared/race-api';
import { HuraceDataApiService } from '../shared/hurace-data-api.service';
import { HuraceLiveApiService } from '../shared/hurace-live-api.service';

@Component({
  selector: 'huraceweb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    races: RaceApi[];
    raceIsLive: boolean;
    liveRace: RaceApi;
  
    constructor(private hs: HuraceDataApiService,
                private hls: HuraceLiveApiService) { }
    
    ngOnInit() {
        this.hs.getAllRace().subscribe(res => this.races = res);
        this.hls.isLive.subscribe(res => {
          this.raceIsLive = res;

          if (this.raceIsLive) {
            this.hls.getLiveRace().subscribe(res => this.liveRace = res);
          } else {
            this.liveRace = null;
          }
        });
    }
}