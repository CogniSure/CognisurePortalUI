import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

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
      // {path: 'pendingauth', component: PendingForAuthComponent}
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

