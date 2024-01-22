import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';


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
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'inbox',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./inbox/inbox.module').then((m) => m.InboxModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
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
