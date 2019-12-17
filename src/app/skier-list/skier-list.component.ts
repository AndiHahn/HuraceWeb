import { Component, OnInit } from '@angular/core';
import { Skier } from '../shared/skier';
import { HuraceApiService } from '../shared/hurace-api.service';

@Component({
  selector: 'huraceweb-skier-list',
  templateUrl: './skier-list.component.html',
  styleUrls: ['./skier-list.component.css']
})
export class SkierListComponent implements OnInit {

  skiers: Skier[];
  
  constructor(private hs: HuraceApiService) { }

  ngOnInit() {
    this.hs.getAllSkier().subscribe(res => this.skiers = res);
  }

}
