import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Errors } from 'src/app/model/common/errors';
import { LoginData } from 'src/app/model/common/logindata';
import { DataComponent } from 'src/app/model/data';
import { UserProfile } from 'src/app/model/profile/userprofile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { AccountService } from 'src/app/services/user/accounts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  showSpinner = false;
  apiUrl = "";
  showSpinner1 = false;
  constructor(
    private auth: AuthService,
    private router: Router,
    private globalService: GlobalService,
    private accService: AccountService,
    // private validationService: ValidationService,
    private formBuilder: FormBuilder
    
  ) {}
  isvalidform = true;
  env = environment;
  imageObject: any;
  enableSlideButton = false;
  email: string = '';
  myOptions = {
    placement: 'right',
    showDelay: 2,
    hideDelay: 2,
    width: '180px',
    'tooltip-class': 'tooltipCss',
  };
  userDetail: UserProfile = {
    UserID: 0,
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Password: '',
    PhoneNumber: '',
    Email: '',
    ClientID: 0,
    ClientName: '',
    UserTypeName: '',
    UserTypeID: 0,
    ClientCode: '',
    IsAdmin: false,
    UserImage: '',
  };
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  validationErrors: Errors[] = [];
  ngOnInit(): void {
    this.auth.logout();
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
    sessionStorage.setItem('Accounts', '');
  }
  passwordInfo = DataComponent.Tooltip;
  Login(event: any) {
    
    this.showSpinner=true;
    this.validationErrors = [];
    this.validationErrors = this.validateInput();
    this.showErrors();
    if (this.validationErrors.length == 0) {
      event.preventDefault();
      this.email = this.loginForm.value.email!;
      this.accService.login(this.apiUrl,this.loginForm.value).subscribe((res:any) => {
        if (res.success) {
          this.auth.setToken(res);
          this.accService.getUserProfile(this.apiUrl,this.email).subscribe((user:any) => {
            this.accService.getAcountDetails(this.apiUrl, user.UserID).subscribe((acc:any) => {
              if (acc == null || acc.length == 0) {
                this.isvalidform = false;
                this.validationErrors.push({
                  Key: 'all',
                  Error: 'Invalid Business Email/Password',
                });
                this.showSpinner=false;
                return;
              }
              
              // this.accService.Check2FAStatus(this.email).subscribe((fa:any) => {
              //   if (!fa.success) {
              //     this.accService.Send2FAEmail(this.email).subscribe((fae:any) => {
              //       if (fae.success) {
              //         this.showSpinner=false;
              //         this.router.navigate(['/pendingauth'], {
              //           queryParamsHandling: 'preserve',
              //         });
              //       }
              //     });
              //   } else {
              //     if (res.value.accessToken === null) {
              //       this.validationErrors.push({
              //         Key: 'all',
              //         Error: 'Invalid Business Email/Password',
              //       });
              //       this.isvalidform = false;
              //     } else {
              //       let tempUser: TempUser = {
              //         AuthVal: res,
              //         UserInput: this.loginForm.value,
              //       };
              //       this.globalService.tempUser$.next(tempUser);
              //       // this.auth.setSession(res);
              //       // this.getUser(this.loginForm.value);
              //       this.showSpinner=false;
              //       this.router.navigate(['/multifactorauthentication'], {
              //         queryParamsHandling: 'preserve',
              //       });
              //       this.isvalidform = true;
              //     }
              //   }
              // });
            });
          });
        } else {
          this.isvalidform = false;
          this.validationErrors.push({
            Key: 'all',
            Error: 'Invalid Business Email/Password',
          });
          this.showSpinner=false;
        }
        this.showErrors();
      });
    }
  }

  formValues = new Map<string, string>();
  resetError(key: string) {
    let removeError = false;
    if (this.formValues.has(key)) {
      let val: string = this.formValues.get(key)!;
      if (val != this.loginForm.get(key)!.value) {
        removeError = true;
        this.formValues.set(key, this.loginForm.get(key)!.value);
      } else {
        removeError = false;
      }
    } else {
      if (this.loginForm.get(key)!.value === '') {
        removeError = false;
      } else {
        removeError = true;
        this.formValues.set(key, this.loginForm.get(key)!.value);
      }
    }

    if (!removeError) return;
    this.validationErrors = this.validationErrors.filter((x) => x.Key != key);
    if (
      this.validationErrors.filter((x) => x.Key == 'all').length ===
      this.validationErrors.length
    ) {
      this.validationErrors = [];
    }
  }
  showErrors() {
    this.validationErrors.forEach((element) => {
      if (element.Key === 'email') {
        this.loginForm.controls[element.Key].setErrors({ incorrect: true });
        this.loginForm.controls[element.Key].markAsTouched();
      }
      if (element.Key === 'password') {
        this.loginForm.controls[element.Key].setErrors({ incorrect: true });
        this.loginForm.controls[element.Key].markAsTouched();
      }
      if (element.Key === 'all') {
        this.loginForm.controls['email'].setErrors({ incorrect: true });
        this.loginForm.controls['email'].markAsTouched();
        this.loginForm.controls['password'].setErrors({ incorrect: true });
        this.loginForm.controls['password'].markAsTouched();
      }
      this.showSpinner=false;
    });
    
    
  }
  validateInput(): Errors[] {
    let loginData: LoginData = {
      Email: this.loginForm.value.email!,
      Password: this.loginForm.value.password!,
    };
    let result: Errors[] = [];

    //result = this.validationService.validateLogin(loginData);
    return result;
  }
  imageClickHandler(val: any) {
    this.enableSlideButton = val;
  }
  getUser({ email, password }: any) {
    this.accService.getUserProfile(this.apiUrl,email).subscribe((res:any) => {
      this.userDetail = res;
      this.accService.getAcountDetails(this.apiUrl,res.UserID).subscribe((acc:any) => {
       // this.globalService.setAccounts(acc);
        this.router.navigate(['/dashboard/home'], {
          queryParamsHandling: 'preserve',
        });
      });
      //this.globalService.setUserProfile(res);
    });
  }
  
}
