import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { PaymentProcessingComponent } from './components/payment-processing/payment-processing.component';


@NgModule({
  declarations: [
    CartViewComponent,
    CartItemComponent,
    OrderCreateComponent,
    OrderSummaryComponent,
    PaymentProcessingComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
