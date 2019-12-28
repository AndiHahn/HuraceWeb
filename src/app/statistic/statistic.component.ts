import { Component, OnInit } from '@angular/core';
import { RaceApi } from '../shared/race-api';
import { HuraceDataApiService } from '../shared/hurace-data-api.service';
import { Racelocation } from '../shared/racelocation';
import { Race } from '../shared/race';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
    
    seasonOptions: any = ['2017/2018', '2018/2019', '2019/2020'];
    selectedSeason: string;

    races: Race[] = [];
    
    raceLocations: Racelocation[] = [];
    slalom: Race[] = [];
    giantSlalom: Race[] = [];

    allVisible: boolean = true;
    slalomVisible: boolean = false;
    giantSlalomVisible: boolean = false;
    
    constructor(private hs: HuraceDataApiService) { }
    
    ngOnInit() {
        this.selectedSeason = '2019/2020';
        let year = this.convertSeasonToYear(this.selectedSeason);
        this.loadRacesBySeason(year);
    }

    convertSeasonToYear(season: string): string {
        let year = this.selectedSeason.split('/', 2);
        if (year.length > 0) {
            return year[0];
        } else {
            return "";
        }
    }

    onSeasonSelected() {
        let year = this.convertSeasonToYear(this.selectedSeason);
        this.loadRacesBySeason(year);
    }

    loadRacesBySeason(season: string) {
        this.hs.getAllRaceBySeason(season).subscribe(res => 
            {
                this.races = [];
                this.raceLocations = [];
                this.slalom = [];
                this.giantSlalom = [];
                
                res.map((r) => {
                    let newRace = new Race(r);
                    newRace.resultAvailable = false;
                    this.races.push(newRace);
                });
    
                let val = {index: 0 }
                let id = 0;
                this.races.forEach(item => {
                    //ALL
                    if (this.containsLocation(item.race.location, val)) {
                        this.raceLocations[val.index].races.push(item);
                    } else {
                        //push new Racelocation
                        let rl = new Racelocation(id, item.race.location, []);
                        rl.races.push(item);
                        this.raceLocations.push(rl);
                    }
                    //SLALOM or GIANT SLALOM
                    if (item.race.raceType == "Slalom") {
                        this.slalom.push(item);
                    } else if (item.race.raceType == "Riesenslalom") {
                        this.giantSlalom.push(item);
                    }
                    id++;
                });
    
                this.updateResultAvailable();
            });
    }

    containsLocation(l: string, ret: {index: number}): boolean {
        let foundElement = false;
        ret.index = -1;

        this.raceLocations.forEach(item => 
            {
                ret.index++;
                if (item.location == l) {
                    foundElement = true;
                }
            });
        return foundElement;
    }

    updateResultAvailable() {
        //ALL RACES
        this.raceLocations.forEach(item => {
            item.races.forEach(race => {
                this.hs.getResults(race.race.id, 2)
                .subscribe(res => race.resultAvailable = res.length > 0);
            })
        });

        //SLALOM
        this.slalom.forEach(item => {
            this.hs.getResults(item.race.id, 2)
                .subscribe(res => item.resultAvailable = res.length > 0);
        });
        //GIANT SLALOM
        this.giantSlalom.forEach(item => {
            this.hs.getResults(item.race.id, 2)
                .subscribe(res => item.resultAvailable = res.length > 0);
        });
    }

    showAll() {
        this.allVisible = true;
        this.slalomVisible = false;
        this.giantSlalomVisible = false;
    }

    showSlalom() {
        this.allVisible = false;
        this.slalomVisible = true;
        this.giantSlalomVisible = false;
    }

    showGiantSlalom() {
        this.allVisible = false;
        this.slalomVisible = false;
        this.giantSlalomVisible = true;
    }
}
