import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagewidgetsComponent } from './inbox/managewidgets/managewidgets.component';
import { AgencyComponent } from './widgets/agency/agency.component';
import { CoveragesComponent } from './widgets/coverages/coverages.component';
import { ExposureComponent } from './widgets/exposure/exposure.component';
import { LossesComponent } from './widgets/losses/losses.component';
import { RiskClearanceComponent } from './widgets/risk-clearance/risk-clearance.component';
import { TotalLossesComponent } from './widgets/total-losses/total-losses.component';
import { DashboardwidgetsComponent } from './dashboard/dashboardwidgets/dashboardwidgets.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { SummaryComponent } from './inbox/summary/summary.component';


// const routes:Routes = [
//   {path: 'managewidgets', component: ManagewidgetsComponent},
//   {path: 'agency', component: AgencyComponent},
//   {path: 'coverages', component: CoveragesComponent},
//   {path: 'exposure', component: ExposureComponent},
//   {path: 'losses', component: LossesComponent},
//   {path: 'risk-clearance', component: RiskClearanceComponent},
//   {path: 'total-losses', component: TotalLossesComponent},
//   {path: 'dashboardwidgets', component: DashboardwidgetsComponent}
// ];

const routes: Routes = [
  {
    path: 'dashboard',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'inbox',
    //canActivate: [AuthGuard],
    loadChildren: () =>
      import('./inbox/inbox.module').then((m) => m.InboxModule),
  },
  {
    path: '',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
