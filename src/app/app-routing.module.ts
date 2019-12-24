import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SkierListComponent } from './skier-list/skier-list.component';
import { SkierEditComponent } from './skier-edit/skier-edit.component';
import { StatisticComponent } from './statistic/statistic.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'skiers',
    component: SkierListComponent
  },
  {
    path: 'skiers/:id',
    component: SkierEditComponent
  },
  {
    path: 'index.html',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'statistics',
    component: StatisticComponent
  },
  {
    path: 'statistics/result/:raceid',
    component: ResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }