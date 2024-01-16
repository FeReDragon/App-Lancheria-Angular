import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { OrderManagementComponent } from './components/order-management/order-management.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ManageDishOfTheDayComponent } from './components/manage-dish-of-the-day/manage-dish-of-the-day.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ManageProductsComponent,
    OrderManagementComponent,
    AnalyticsComponent,
    ManageDishOfTheDayComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    AccordionModule.forRoot(),

  ]
})
export class AdminModule { }
