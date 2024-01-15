import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishOfTheDayComponent } from './components/dish-of-the-day/dish-of-the-day.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DishOfTheDayComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DishOfTheDayComponent
  ]
})
export class DishOfTheDayModule { }


