import { Component, OnInit } from '@angular/core';
import { Skier } from '../shared/skier';
import { HuraceDataApiService } from '../shared/hurace-data-api.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-startlist',
  templateUrl: './startlist.component.html',
  styleUrls: ['./startlist.component.css']
})
export class StartlistComponent implements OnInit {

    loggedIn: boolean;

    startlist: Skier[];
    startlistDelta: Skier[];
    selectedSkier: Skier;
    
    constructor(private hs: HuraceDataApiService,
                private route: ActivatedRoute,
                private authService: AuthService) { }
    
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.hs.getStartlist(params['id'])
                .subscribe(res => this.startlist = res);
            this.hs.getStartlistDelta(params['id'])
                .subscribe(res => this.startlistDelta = res);
        });

        this.authService.authState
            .subscribe(user => this.loggedIn = (user != null));
    }

    proposeSkier() {
        console.log(this.selectedSkier);
    }
}
