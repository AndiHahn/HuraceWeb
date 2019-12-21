import { Component, OnInit } from '@angular/core';
import { Race } from '../shared/race';
import { HuraceApiService } from '../shared/hurace-api.service';

@Component({
  selector: 'huraceweb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  races: Race[];
  
  constructor(private hs: HuraceApiService) { }

  ngOnInit() {
    this.hs.getAllRace().subscribe(res => this.races = res);
  }

}