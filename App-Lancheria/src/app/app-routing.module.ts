import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component'; // Importar HomeComponent
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Rota raiz redireciona para /home
  { path: 'home', component: HomeComponent }, // Rota para HomeComponent
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  // Outras rotas podem ser adicionadas aqui
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
