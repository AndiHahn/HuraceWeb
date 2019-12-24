import { Component, OnInit } from '@angular/core';
import { Race } from '../shared/race';
import { HuraceApiService } from '../shared/hurace-api.service';
import { Racelocation } from '../shared/racelocation';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
    
    races: Race[];
    
    raceLocations: Racelocation[] = [];
    slalom: Race[] = [];
    giantSlalom: Race[] = [];

    allVisible: boolean = true;
    slalomVisible: boolean = false;
    giantSlalomVisible: boolean = false;
    
    constructor(private hs: HuraceApiService) { }
    
    ngOnInit() {
        this.hs.getAllRace().subscribe(res => 
        {
            this.races = res;
            let val = {index: 0 }
            let id = 0;
            this.races.forEach(element => {
                //ALL
                if (this.containsLocation(element.location, val)) {
                    this.raceLocations[val.index].races.push(element);
                } else {
                    //push new Racelocation
                    let rl = new Racelocation(id, element.location, []);
                    rl.races.push(element);
                    this.raceLocations.push(rl);
                }
                //SLALOM or GIANT SLALOM
                if (element.raceType == "Slalom") {
                    this.slalom.push(element);
                } else if (element.raceType == "Riesenslalom") {
                    this.giantSlalom.push(element);
                }
                id++;
            });
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
