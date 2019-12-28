import { Component, OnInit } from '@angular/core';
import { Skier } from '../shared/skier';
import { HuraceDataApiService } from '../shared/hurace-data-api.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'angularx-social-login';

declare var $: any;

@Component({
  selector: 'app-startlist',
  templateUrl: './startlist.component.html',
  styleUrls: ['./startlist.component.css']
})
export class StartlistComponent implements OnInit {

    loggedIn: boolean;

    startlist: Skier[];
    startlistDelta: Skier[];
    private selectedSkier: any;

    constructor(private hs: HuraceDataApiService,
                private route: ActivatedRoute,
                private authService: AuthService) { }
    
    ngOnInit() {
        this.loadStartlists();

        this.authService.authState
            .subscribe(user => {
                this.loggedIn = (user != null);

                setTimeout(() => {
                    $('.selectpicker').selectpicker('refresh');
                }, 500);
            } );
    }

    loadStartlists() {
        this.route.params.subscribe(params => {
            this.hs.getStartlist(params['id'])
                .subscribe(res => this.startlist = res);
            this.hs.getStartlistDelta(params['id'])
                .subscribe(res => {
                    this.startlistDelta = res;
                    
                    setTimeout(() => {
                        $('.selectpicker').selectpicker('refresh');
                    }, 500);
                });
        });
    }

    proposeSkier() {
        let selectedId = this.findIdForSkier(this.selectedSkier);
        let addSkier: Skier = new Skier(selectedId);
        this.selectedSkier = "";

        this.route.params.subscribe(params => {
            this.hs.addSkierToStartlist(addSkier, params['id'])
                .subscribe(res => {
                    this.loadStartlists();
                })
        });
    }

    findIdForSkier(name: string): number {
        let id = 0;
        this.startlistDelta.forEach(item => {
            let skierName = item.firstName + " " + item.lastName;
            if (skierName == name) {
                id = item.id;
            }
        });
        return id;
    }
}
