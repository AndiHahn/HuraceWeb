import { Component, OnInit } from '@angular/core';
import { HuraceDataApiService } from '../shared/hurace-data-api.service';
import { Result } from '../shared/result';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: []
})
export class ResultComponent implements OnInit {

    noResultsAvailable = false;
    resultsRun1: Result[] = [];
    resultsRun2: Result[] = [];
    
    constructor(private hs: HuraceDataApiService,
                private route: ActivatedRoute) { }
    
    ngOnInit() {
        this.route.params.subscribe(params =>
            {
                this.hs.getResults(params['raceid'], 1)
                .subscribe(res =>
                    {
                        if (res.length == 0) {
                            this.noResultsAvailable = true;
                        }

                        res.map((result) => 
                        {
                            let timeString: string = "";
                            if (result.status == "OK") {
                                if (result.ordinal == 1) {
                                    timeString = result.time.slice(3, -5);
                                } else {
                                    timeString = "+ " + result.residue.slice(3, -5);
                                }
                            } else {
                                timeString = result.status;
                            }
                            let newResult = new Result(result.ordinal, 
                                                       result.countryImgUrl, 
                                                       result.name, 
                                                       timeString);
                            this.resultsRun1.push(newResult);
                        })
                    });
                this.hs.getResults(params['raceid'], 2)
                .subscribe(res =>
                    {
                        res.map((result) => 
                        {
                            let timeString = "";
                            if (result.status == "OK") {
                                if (result.ordinal == 1) {
                                    timeString = result.time.slice(3, -5);;
                                } else {
                                    timeString = "+ " + result.residue.slice(3, -5);
                                }
                            } else {
                                timeString = result.status;
                            }
                            let newResult = new Result(result.ordinal, 
                                                       result.countryImgUrl, 
                                                       result.name, 
                                                       timeString);
                            this.resultsRun2.push(newResult);
                        })
                    });
            })
    }
}
