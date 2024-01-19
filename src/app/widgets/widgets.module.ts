import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LossesComponent } from './losses/losses.component';
import { CoveragesComponent } from './coverages/coverages.component';
import { ExposureComponent } from './exposure/exposure.component';
import { TotalLossesComponent } from './total-losses/total-losses.component';
import { RiskClearanceComponent } from './risk-clearance/risk-clearance.component';
import { AgencyComponent } from './agency/agency.component';
import { XBarComponent } from './xbar/xbar.component';
import { YBarComponent } from './ybar/ybar.component';
import { KendoModule } from '../kendo/kendo.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PieComponent } from './pie/pie.component';
import { SimpleDataComponent } from './simple-data/simple-data.component';
import { MaterialModule } from '../material/material.module';
import { FunnelComponent } from './funnel/funnel.component';
import { SimpleDataNoheaderComponent } from './simple-data-noheader/simple-data-noheader.component';
import { ChartsModule } from '@progress/kendo-angular-charts';



@NgModule({
  declarations: [
    LossesComponent,
    CoveragesComponent,
    ExposureComponent,
    TotalLossesComponent,
    RiskClearanceComponent,
    AgencyComponent,
    XBarComponent,
    YBarComponent,
    PieComponent,
    SimpleDataComponent,
    FunnelComponent,
    SimpleDataNoheaderComponent
  ],
  imports: [
    CommonModule,
    KendoModule,
    MaterialModule,
    ChartsModule,
  ]
})
export class WidgetsModule { }
