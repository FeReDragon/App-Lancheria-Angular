import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router'; 
import { DishOfTheDayModule } from '../modules/dish-of-the-day/dish-of-the-day.module';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DishOfTheDayModule
    // Outros módulos...
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent
  ]
})
export class SharedModule { }