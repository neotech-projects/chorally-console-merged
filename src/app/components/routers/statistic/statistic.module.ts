import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticComponent } from './statistic/statistic.component';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    StatisticComponent
  ],
  imports: [
    CommonModule,
    StatisticRoutingModule,
    MatToolbarModule
  ]
})
export class StatisticModule { }
