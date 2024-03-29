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
import { AccountInformationComponent } from './helper/account-information/account-information.component';
import { AccountInformationDataComponent } from './helper/account-information-data/account-information-data.component';
import { CoverageRequestedComponent } from './helper/coverage-requested/coverage-requested.component';
import { PriorCarrierInformationComponent } from './helper/prior-carrier-information/prior-carrier-information.component';
import { FormsModule } from '@angular/forms';
import { ExposureSummaryComponent } from './exposure-summary/exposure-summary.component';
import { LossSummaryComponent } from './loss-summary/loss-summary.component';
import { CopilotComponent } from '../core/copilot/copilot.component';
import { RiskClearanceComponent } from './risk-clearance/risk-clearance.component';
import { RiskInsightsComponent } from './risk-insights/risk-insights.component';
import { FileComparerComponent } from './file-comparer/file-comparer.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';


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
    InboxDetailComponent,
    AccountInformationComponent,
    AccountInformationDataComponent,
    CoverageRequestedComponent,
    PriorCarrierInformationComponent,
    ExposureSummaryComponent,
    LossSummaryComponent,
    RiskClearanceComponent,
    RiskInsightsComponent,
    FileComparerComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    KendoModule,
    MaterialModule,
    NgxJsonViewerModule,
    InboxRoutingModule
  ]
})
export class InboxModule { }
