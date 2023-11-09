import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { RuleConfigurationComponent } from './rule-configuration/rule-configuration.component';
import { CreateRuleComponent } from './admin/create-rule.component';
const routes:Routes = [
  {
    path: '', 
    component: MainComponent,
    children:[
      {path: 'home', component: HomeComponent},
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
      { path: 'Rule', component:RuleConfigurationComponent, 
        children:[
          {
            path: 'CreateRule',  
            component: CreateRuleComponent,
          },
        ]
    },
    ]
  },
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
