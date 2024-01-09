import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionsRoutingModule } from './promotions-routing.module';
import { PromotionDashboardComponent } from './components/promotion-dashboard/promotion-dashboard.component';
import { PromotionCreateComponent } from './components/promotion-create/promotion-create.component';
import { PromotionEditComponent } from './components/promotion-edit/promotion-edit.component';
import { PromotionListComponent } from './components/promotion-list/promotion-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PromotionDashboardComponent,
    PromotionCreateComponent,
    PromotionEditComponent,
    PromotionListComponent
  ],
  imports: [
    CommonModule,
    PromotionsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PromotionsModule { }
