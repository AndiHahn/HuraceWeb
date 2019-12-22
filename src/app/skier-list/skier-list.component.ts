import { Component, OnInit, EventEmitter } from '@angular/core';
import { Skier } from '../shared/skier';
import { HuraceApiService } from '../shared/hurace-api.service';
import { distinctUntilChanged, debounceTime, tap, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'huraceweb-skier-list',
  templateUrl: './skier-list.component.html',
  styleUrls: ['./skier-list.component.css']
})
export class SkierListComponent implements OnInit {

    skiers: Skier[];
    
    isLoading = false;
    keyup = new EventEmitter<string>();
    
    constructor(private hs: HuraceApiService,
                private authService: AuthenticationService) { }
    
    ngOnInit() {
        this.loadSkier();
    
        this.keyup.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => this.isLoading = true),
            switchMap(searchTerm => this.hs.getAllSearch(searchTerm)),
            tap(() => this.isLoading = false)
        ).subscribe(skiers => this.skiers = skiers);
    }
    
    loadSkier() {
        this.hs.getAllSkier().subscribe(res => this.skiers = res);
    }
    
    deleteSkier(id: number) {
        this.hs.deleteSkier(id).subscribe(res => {
            this.loadSkier();
        });
    }

    private isLoggedIn() : boolean {
        return this.authService.isLoggedIn();
    }
}
