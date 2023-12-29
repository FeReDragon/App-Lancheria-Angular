import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { OrderManagementComponent } from './components/order-management/order-management.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { InventoryManagementComponent } from './components/inventory-management/inventory-management.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ManageProductsComponent,
    OrderManagementComponent,
    AnalyticsComponent,
    InventoryManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }