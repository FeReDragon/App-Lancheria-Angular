import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishOfTheDayComponent } from './components/dish-of-the-day/dish-of-the-day.component';


@NgModule({
  declarations: [
    DishOfTheDayComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DishOfTheDayComponent
  ]
})
export class DishOfTheDayModule { }


