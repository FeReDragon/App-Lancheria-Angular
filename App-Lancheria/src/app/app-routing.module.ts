import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component'; // Importar HomeComponent
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductListComponent } from './modules/catalog/components/product-list/product-list.component';
import { CartViewComponent } from './modules/checkout/components/cart-view/cart-view.component';
import { OrderCreateComponent } from './modules/checkout/components/order-create/order-create.component';
import { OrderSummaryComponent } from './modules/checkout/components/order-summary/order-summary.component';
import { ManageProductsComponent } from './modules/admin/components/manage-products/manage-products.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Rota raiz redireciona para /home
  { path: 'home', component: HomeComponent }, // Rota para HomeComponent
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'menu', component: ProductListComponent },
  { path: 'carrinho', component: CartViewComponent },
  { path: 'pedido', component: OrderCreateComponent },
  { path: 'sumario', component: OrderSummaryComponent },
  { path: 'adm-itens', component: ManageProductsComponent },
  // Outras rotas podem ser adicionadas aqui
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
