import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    MainComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule, 
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    UserRoutingModule
  ]
})
export class UserModule { }
