import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ManagewidgetsComponent } from './managewidgets/managewidgets.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InboxDetailComponent } from './inbox-detail/inbox-detail.component';
import { SummaryComponent } from './summary/summary.component';
import { ApplicationComponent } from './application/application.component';
import { AccountAssesmentComponent } from './account-assesment/account-assesment.component';
import { ExposerAnalysisComponent } from './exposer-analysis/exposer-analysis.component';
import { LossAnalysisComponent } from './loss-analysis/loss-analysis.component';
import { DocumentVaultComponent } from './document-vault/document-vault.component';
import { RiskClearanceComponent } from './risk-clearance/risk-clearance.component';
import { RiskInsightsComponent } from './risk-insights/risk-insights.component';

const routes:Routes = [
  {
    path: '', 
    component: MainComponent,
    children:[
      {path: 'home', component: HomeComponent},
      { path: '', redirectTo: '/inbox/home', pathMatch: 'full' },
      { path: 'detail', component:InboxDetailComponent, 
        children:[
          {
            path: 'summary',  
            component: SummaryComponent,
          },
          {
            path: 'application',  
            component: ApplicationComponent,
          },
          {
            path: 'accountassesment',  
            component: AccountAssesmentComponent,
          },
          {
            path: 'exposeranalysis',  
            component: ExposerAnalysisComponent,
          },
          {
            path: 'lossanalysis',  
            component: LossAnalysisComponent,
          },
          {
            path: 'documentvault',  
            component: DocumentVaultComponent,
          },
          {
            path: 'riskclearance',  
            component: RiskClearanceComponent,
          },
          {
            path: 'riskinsights',  
            component: RiskInsightsComponent,
          },
        ]
    },
      // {path: 'dashboardwidgets', component: DashboardwidgetsComponent}
      // {path: 'accountnames', component: AccountnamesComponent},
      // {path: 'accountnameslist', component: AccountnameslistComponent},
      // {path: 'providerandratesearch', component: ProviderandratesearchComponent},
      // {path: 'projectedcost', component: ProjectedcostComponent}
      
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule { }
