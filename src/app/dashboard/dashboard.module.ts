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
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { NewsComponent } from './news/news.component';
import { RemindersComponent } from './reminders/reminders.component';
import { KendoModule } from '../kendo/kendo.module';




@NgModule({
  declarations: [
    MainComponent,
    DashboardwidgetsComponent,
    HomeComponent,
    InfoPanelComponent,
    NewsComponent,
    RemindersComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
    MaterialModule,
    WidgetsModule,
    FormsModule,
    ReactiveFormsModule,
    KendoModule
  ]
})
export class DashboardModule { }
