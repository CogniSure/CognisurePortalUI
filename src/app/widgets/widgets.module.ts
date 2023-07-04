import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LossesComponent } from './losses/losses.component';
import { CoveragesComponent } from './coverages/coverages.component';
import { ExposureComponent } from './exposure/exposure.component';
import { TotalLossesComponent } from './total-losses/total-losses.component';
import { RiskClearanceComponent } from './risk-clearance/risk-clearance.component';
import { AgencyComponent } from './agency/agency.component';



@NgModule({
  declarations: [
    LossesComponent,
    CoveragesComponent,
    ExposureComponent,
    TotalLossesComponent,
    RiskClearanceComponent,
    AgencyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WidgetsModule { }
