import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { DashboardwidgetsComponent } from './dashboardwidgets/dashboardwidgets.component';
import { HomeComponent } from './home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material/material.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    MainComponent,
    DashboardwidgetsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
    MaterialModule,
    WidgetsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
