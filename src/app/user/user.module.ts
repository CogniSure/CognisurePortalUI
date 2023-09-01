import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRoutingModule } from './user-routing.module';
import { CoreModule } from '../core/core.module';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { ResetSuccessComponent } from './resetsuccess/resetsuccess.component';
import { RegistrationComponent } from './registration/registration.component';
import { MultifactorauthenticationComponent } from './multifactorauthentication/multifactorauthentication.component';
import { EmailsentComponent } from './emailsent/emailsent.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { KendoModule } from '../kendo/kendo.module';



@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    VerifyemailComponent,
    TermsandconditionsComponent,
    ResetSuccessComponent,
    RegistrationComponent,
    MultifactorauthenticationComponent,
    EmailsentComponent,
    ContactusComponent,
    ChangepasswordComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent
  ],
  imports: [
    CommonModule,
    MaterialModule, 
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    UserRoutingModule,
    CoreModule,
    KendoModule
  ]
})
export class UserModule { }
