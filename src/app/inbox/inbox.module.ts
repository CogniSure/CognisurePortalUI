import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ManagewidgetsComponent } from './managewidgets/managewidgets.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from '../core/core.module';
import { SummaryComponent } from './summary/summary.component';
import { ApplicationComponent } from './application/application.component';
import { AccountAssesmentComponent } from './account-assesment/account-assesment.component';
import { ExposerAnalysisComponent } from './exposer-analysis/exposer-analysis.component';
import { LossAnalysisComponent } from './loss-analysis/loss-analysis.component';
import { DocumentVaultComponent } from './document-vault/document-vault.component';
import { KendoModule } from '../kendo/kendo.module';
import { InboxRoutingModule } from './inbox-routing.module';
import { InboxDetailComponent } from './inbox-detail/inbox-detail.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    MainComponent,
    ManagewidgetsComponent,
    HomeComponent,
    SummaryComponent,
    ApplicationComponent,
    AccountAssesmentComponent,
    ExposerAnalysisComponent,
    LossAnalysisComponent,
    DocumentVaultComponent,
    InboxDetailComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    KendoModule,
    MaterialModule,
    InboxRoutingModule
  ]
})
export class InboxModule { }
