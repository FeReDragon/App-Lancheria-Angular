import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { PaymentProcessingComponent } from './components/payment-processing/payment-processing.component';
import { CatalogModule } from '../catalog/catalog.module';
import { FormsModule } from '@angular/forms';
import { AuthModule } from 'src/app/auth/auth.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CartViewComponent,

    OrderCreateComponent,
    OrderSummaryComponent,
    PaymentProcessingComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    CatalogModule,
    FormsModule,
    SharedModule
  ]
})
export class CheckoutModule { }
