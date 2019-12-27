import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SkierListComponent } from './skier-list/skier-list.component';
import { SkierEditComponent } from './skier-edit/skier-edit.component';
import { StatisticComponent } from './statistic/statistic.component';
import { ResultComponent } from './result/result.component';
import { LiveComponent } from './live/live.component';
import { StartlistComponent } from './startlist/startlist.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'index.html',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'home/:id',
    component: StartlistComponent,
    pathMatch: 'full'
  },
  {
    path: 'skiers',
    component: SkierListComponent,
    pathMatch: 'full'
  },
  {
    path: 'skiers/:id',
    component: SkierEditComponent,
    pathMatch: 'full'
  },
  {
    path: 'statistics',
    component: StatisticComponent,
    pathMatch: 'full'
  },
  {
    path: 'statistics/result/:raceid',
    component: ResultComponent,
    pathMatch: 'full'
  },
  {
    path: 'live',
    component: LiveComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }