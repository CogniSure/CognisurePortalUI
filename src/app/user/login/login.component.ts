import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Errors } from 'src/app/model/common/errors';
import { LoginData } from 'src/app/model/common/logindata';
import { DataComponent } from 'src/app/model/samples/data';
import { UserProfile } from 'src/app/model/profile/userprofile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/common/global.service';
import { UrlService } from 'src/app/services/common/url.service';
import { AccountService } from 'src/app/services/user/accounts.service';
import { matchValidator } from 'src/app/core/generic/utils/match-validator';
import { PasswordToolTip } from 'src/app/model/constants/tooltipDetails';
import { Accounts } from '../../model/profile/accounts';
import { BehaviorSubject } from 'rxjs';
import { AppConfigService } from 'src/app/app-config-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  invalidPasswordAttempts = 0;
  passwordBlocked = false;
 environmentData = this.configService.settings;
 env = this.configService.settings;
 privacyurl = "";
  password: string = '';
  invalidPassword: boolean = false;
  showPassword = false;
  hide = true;
  showSpinner = false;
  apiUrl = '';
  showSpinner1 = false;
  accounts$ = new BehaviorSubject<any>(null);
dashboardFilter$ = new BehaviorSubject<any>(null);
  constructor(
    private authService: AuthService,
    private urlService: UrlService,
    private router: Router,
    private globalService: GlobalService,
    private accService: AccountService,
    private formBuilder: FormBuilder,
    private configService:AppConfigService,
  ) {
    this.env = this.configService.settings;
    console.log(this.configService.settings)
    //this.privacyurl = this.env.privacyUrl
  }
  isvalidform = true;
  imageObject: any;
  enableSlideButton = false;
  email: string = '';
  tooltip = PasswordToolTip;

  setAccounts(account: Accounts[]) {
    localStorage.setItem('Accounts', JSON.stringify(account));
    this.setSelectedAccount(account[0])
  }
 
  setSelectedAccount(account: Accounts) {
    localStorage.setItem('SelectedAccounts', JSON.stringify(account));
    this.accounts$.next(account);
    this.dashboardFilter$.next({...this.dashboardFilter$.value,Account : account})
  }

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

  // loginForm = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     this.passwordValidator(),
  //   ]),
  // });


  validationErrors: string[] = [];
  ngOnInit(): void {
    this.authService.logout();
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    localStorage.setItem('Accounts', '');
  }
  passwordInfo = DataComponent.Tooltip;
  Login(event: any) {
    this.showSpinner = true;
    this.validationErrors = [];
    if (this.loginForm.valid) {
      event.preventDefault();
      this.email = this.loginForm.value.email!;
      this.authService.login(this.loginForm.value).subscribe((res: any) => {
        if (res.success) {
          this.authService.setToken(res);
          this.accService
            .getUserProfile(this.email)
            .subscribe((user: any) => {
              //this.showSpinner? this.showSpinner = false : this.showSpinner = true;
              this.globalService.setUserProfile(user);
              this.router.navigate(['/dashboard/home'], {
                queryParamsHandling: 'preserve',
              });
            });
         
        } 
        else {
          //this.showSpinner? this.showSpinner = false : this.showSpinner = true;
          this.validationErrors.push('Invalid Username and password');
          this.invalidPasswordAttempts++;
          if (this.invalidPasswordAttempts >= 3) {
            this.passwordBlocked = true;
          }
        }
      });
    }
    else if (this.password.length < 8 || !/\d/.test(this.password) || !/[a-zA-Z]/.test(this.password)) {
      this.invalidPassword = true;
      //this.showSpinner? this.showSpinner = false : this.showSpinner = true;
      return; 
    }
  }

  formValues = new Map<string, string>();
  
  imageClickHandler(val: any) {
    this.enableSlideButton = val;
  }

  getUser({ email, password }: any) {
    this.accService.getUserProfile(email).subscribe((res: UserProfile) => {
      this.userDetail = res;
      this.accService.getAcountDetails(res.UserID).subscribe((acc: any) => {
        this.globalService.setAccounts(acc);
        this.router.navigate(['/dashboard/home'], {
          queryParamsHandling: 'preserve',
        });
      });
      this.globalService.setUserProfile(res);
    });
  }

  // getUser({ email, password }: any) {
  //   this.accService.getUserProfile(this.apiUrl,email).subscribe((res:any) => {
  //     this.userDetail = res;
  //     this.accService.getAcountDetails(this.apiUrl,res.UserID).subscribe((acc:any) => {
  //      // this.globalService.setAccounts(acc);
  //       this.router.navigate(['/dashboard/home'], {
  //         queryParamsHandling: 'preserve',
  //       });
  //     });
  //     //this.globalService.setUserProfile(res);
  //   });
  // }


  // togglePasswordVisibility() {
  //   this.hide = !this.hide;

  //   if (this.hide) {
  //     setTimeout(() => {
  //       this.hide = true; 
  //     }, 3000);
  //   }
  // }
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password-input') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
    setTimeout(() => {
      passwordInput.type = 'password';
      this.showPassword = false;
    }, 3000);
  }


  sliderimages = [
    { url: 'assets/images/Image_SIP_LoginPage_1.jpg', caption: 'Real Time Data Insights' },
    { url: 'assets/images/Image_SIP_LoginPage_2.jpg', caption: 'Unified Experience' }
  ];

}
