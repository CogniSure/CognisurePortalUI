import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EmailsentComponent } from './emailsent/emailsent.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MultifactorauthenticationComponent } from './multifactorauthentication/multifactorauthentication.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { ResetSuccessComponent } from './resetsuccess/resetsuccess.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';


const routes:Routes = [
  {
    path: '', 
    component: MainComponent,
    children:[
      {path: 'login', component: LoginComponent},
      // {path: 'forgotpassword', component: ForgotpasswordComponent},
      // {path: 'emailsent', component: EmailsentComponent},
      // {path: 'resetpassword', component: ResetpasswordComponent},
      // {path: 'registration', component: RegistrationComponent},
      // {path: 'verifyemail', component: VerifyemailComponent},
      // {path: 'contactus/:pageId', component: ContactusComponent},
      // {path: 'authenticate', component: AuthenticationComponent},
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      // {path: 'newlogin', component: NewloginComponent},
      // // {path: 'newforgotpassword', component: NewforgotpasswordComponent},
      // // {path: 'newsetpassword', component: NewsetpasswordComponent},
      // // {path: 'newcheckemail', component: NewcheckemailComponent},
      // {path: 'resetsuccess', component: ResetSuccessComponent},
      // {path: 'changepassword', component: ChangepasswordComponent},
      // {path: 'multifactorauthentication', component: MultifactorauthenticationComponent},
      // {path: 'termsandconditions', component:TermsandconditionsComponent},
      // {path: 'pendingauth', component: PendingForAuthComponent},
      {path: 'contactus', component: ContactusComponent},
      {path: 'emailsent', component: EmailsentComponent},
      {path: 'forgotpassword', component: ForgotpasswordComponent},
      {path: 'multifactorauthentication', component: MultifactorauthenticationComponent},
      {path: 'registration', component: RegistrationComponent},
      {path: 'resetpassword', component: ResetpasswordComponent},
      {path: 'termsandconditions', component: TermsandconditionsComponent},
      {path: 'resetsuccess', component: ResetSuccessComponent},
      {path: 'verifyemail', component: VerifyemailComponent},
      {path: 'changepassword', component: ChangepasswordComponent},
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

