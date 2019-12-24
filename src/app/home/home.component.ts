import { Component, OnInit } from '@angular/core';
import { RaceApi } from '../shared/race-api';
import { HuraceApiService } from '../shared/hurace-api.service';

@Component({
  selector: 'huraceweb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  races: RaceApi[];
  
  constructor(private hs: HuraceApiService) { }

  ngOnInit() {
    this.hs.getAllRace().subscribe(res => this.races = res);
  }

}