import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'div.app-podium-result',
  templateUrl: './podium-result.component.html',
  styleUrls: ['./podium-result.component.css']
})
export class PodiumResultComponent implements OnInit {

    @Input() allResults: number[];
    podiumResult: number[];
    
    constructor() { }
    
    ngOnInit() {
        
    }

    ngOnChanges() {
        this.calculatePodiums();
    }

    calculatePodiums() {
        this.podiumResult = [0, 0, 0];
        if (this.allResults != null) {
            this.allResults.forEach(res => {
                if (res == 1) {
                    this.podiumResult[0]++;
                } else if(res == 2) {
                    this.podiumResult[1]++;
                } else if(res == 3) {
                    this.podiumResult[2]++;
                }
            }); 
        }
    }
}
