import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ManagewidgetsComponent } from './managewidgets/managewidgets.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    MainComponent,
    ManagewidgetsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InboxModule { }
