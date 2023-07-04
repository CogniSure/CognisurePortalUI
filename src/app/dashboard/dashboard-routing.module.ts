import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// import { ManagewidgetsComponent } from './managewidgets/managewidgets.component';
import { MainComponent } from './main/main.component';
import { DashboardwidgetsComponent } from './dashboardwidgets/dashboardwidgets.component';
// import { AccountnamesComponent } from './accountnames/accountnames.component';
// import { AccountnameslistComponent } from './accountnameslist/accountnameslist.component';

const routes:Routes = [
  {
    path: '', 
    component: MainComponent,
    children:[
      {path: 'home', component: HomeComponent},
      // {path: 'managewidgets', component: ManagewidgetsComponent},
      { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
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
export class DashboardRoutingModule { }
