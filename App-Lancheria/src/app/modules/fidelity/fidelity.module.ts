import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FidelityRoutingModule } from './fidelity-routing.module';
import { FidelityDashboardComponent } from './components/fidelity-dashboard/fidelity-dashboard.component';
import { FidelityRulesComponent } from './components/fidelity-rules/fidelity-rules.component';
import { UserFidelityStatusComponent } from './components/user-fidelity-status/user-fidelity-status.component';


@NgModule({
  declarations: [
    FidelityDashboardComponent,
    FidelityRulesComponent,
    UserFidelityStatusComponent
  ],
  imports: [
    CommonModule,
    FidelityRoutingModule
  ]
})
export class FidelityModule { }
