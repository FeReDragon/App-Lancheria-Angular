import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionsRoutingModule } from './promotions-routing.module';
import { PromotionDashboardComponent } from './components/promotion-dashboard/promotion-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PromotionDashboardComponent,
  ],
  imports: [
    CommonModule,
    PromotionsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PromotionsModule { }
