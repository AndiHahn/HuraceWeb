import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HuraceApiService } from '../shared/hurace-api.service';
import { Skier } from '../shared/skier';

@Component({
  selector: 'app-skier-edit',
  templateUrl: './skier-edit.component.html',
  styleUrls: ['./skier-edit.component.css']
})
export class SkierEditComponent implements OnInit {

    skier: Skier = new Skier();

    constructor(private router: Router,
                private route: ActivatedRoute,
                private hs: HuraceApiService) { }

    ngOnInit() {
        this.route.params.subscribe(params => this.hs.getSkierById(params['id'])
                         .subscribe(res => this.skier = res));
    }

    saveSkier() {
        console.log("Save Skier!");
        console.log("First name: " + this.skier.firstName);
    }

    deleteSkier() {
        this.skier.firstName = "test";
        console.log("Delete Skier!");
        console.log("First name: " + this.skier.firstName);
    }
}
