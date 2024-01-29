import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importação dos componentes
import { HomeComponent } from './shared/components/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductListComponent } from './modules/catalog/components/product-list/product-list.component';
import { CartViewComponent } from './modules/checkout/components/cart-view/cart-view.component';
import { OrderCreateComponent } from './modules/checkout/components/order-create/order-create.component';
import { OrderSummaryComponent } from './modules/checkout/components/order-summary/order-summary.component';
import { ManageProductsComponent } from './modules/admin/components/manage-products/manage-products.component';
import { AdminDashboardComponent } from './modules/admin/components/admin-dashboard/admin-dashboard.component';
import { OrderManagementComponent } from './modules/admin/components/order-management/order-management.component';
import { PromotionDashboardComponent } from './modules/promotions/components/promotion-dashboard/promotion-dashboard.component';
import { ManageDishOfTheDayComponent } from './modules/admin/components/manage-dish-of-the-day/manage-dish-of-the-day.component';

// Importação dos guards
import { AuthGuard } from '../app/core/guard/auth.guard';
import { AdminGuard } from '../app/core/guard/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'menu', component: ProductListComponent },
  { path: 'carrinho', component: CartViewComponent, canActivate: [AuthGuard] },
  { path: 'pedido', component: OrderCreateComponent, canActivate: [AuthGuard] },
  { path: 'sumario', component: OrderSummaryComponent, canActivate: [AuthGuard] },
  { path: 'adm-itens', component: ManageProductsComponent, canActivate: [AdminGuard] },
  { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'gerenciamento-pedidos', component: OrderManagementComponent, canActivate: [AdminGuard] },
  { path: 'promo', component: PromotionDashboardComponent, canActivate: [AdminGuard] },
  { path: 'prato-do-dia', component: ManageDishOfTheDayComponent, canActivate: [AdminGuard] },
  // Outras rotas podem ser adicionadas aqui
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

