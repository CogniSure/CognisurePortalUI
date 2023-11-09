import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RuleConfigurationComponent } from './rule-configuration/rule-configuration.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { CreateRuleComponent } from './admin/create-rule.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { KendoModule } from '../kendo/kendo.module';


@NgModule({
  declarations: [
    RuleConfigurationComponent,
    HomeComponent,
    MainComponent,
    CreateRuleComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    FormsModule,
    KendoModule,
    MaterialModule,
  ]
})
export class AdminModule { }
