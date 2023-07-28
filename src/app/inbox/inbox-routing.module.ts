import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ManagewidgetsComponent } from './managewidgets/managewidgets.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes:Routes = [
  {
    path: '', 
    component: MainComponent,
    children:[
      {path: 'home', component: HomeComponent},
      // {path: 'managewidgets', component: ManagewidgetsComponent},
      { path: '', redirectTo: '/inbox/home', pathMatch: 'full' },
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
