import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Errors } from 'src/app/model/common/errors';
import { UserProfile } from 'src/app/model/profile/userprofile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/common/global.service';
import { AccountService } from 'src/app/services/user/accounts.service';
import { ValidationService } from 'src/app/services/validations/validation.service';


@Component({
  selector: 'app-multifactorauthentication',
  templateUrl: './multifactorauthentication.component.html',
  styleUrls: ['./multifactorauthentication.component.scss']
})
export class MultifactorauthenticationComponent implements OnInit {
   timeLeft: number = 20;
  interval: any;
  starttimer = false;
  showSpinner = false;

  validationErrors: Errors[] = [];
  constructor(private auth: AuthService,
    private router: Router,
    private accService: AccountService,
    private validationService: ValidationService,
    private globalService: GlobalService) { }

  authVal: any
  tempUserInput: any
  subscription: Subscription
  ngOnInit(): void {
    this.showSpinner =true
    // this.subscription = this.globalService.tempUser$.subscribe(usr => {
    //   this.authVal = usr.AuthVal,
    //     this.tempUserInput = usr.UserInput
    //     this.showSpinner = false;
    // })

    // this.starttimer = true;
    // this.startTimer()
  }
  // otp = new FormControl('', [Validators.required, Validators.email]);

  // getErrorMessage() {
  //   return this.otp.hasError('required') ? 'You must enter a otp' :
  //       this.otp.hasError('otp') ? 'Not a valid otp' :
  //           '';
  // }

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
    UserImage: ""
  };
  otp: string="";
  onOtpChange(otp: any) {
    this.resetError("otp");
    this.otp = otp;
  }
  // VerifyCode() {
  //   this.showSpinner = true;
  //   this.resetError("otp")
  //   let code: string = this.otp
  //   this.validateInput()
  //   if (this.validationErrors.length>0) {
  //     this.showSpinner =false
  //     return;
  //   }
  //     this.accService.ValidateFACode(this.tempUserInput.email, code).subscribe(res => {
  //       if (res.success) {
  //         this.auth.setSession();
  //         this.getUser(this.tempUserInput.email)
  //       }
  //       else {
  //         this.resetError("otp")
  //         this.validationErrors.push({ Key: 'otp', Error: 'Incorrect Code.' });
  //         this.auth.resetSession();
  //         this.showSpinner =false
  //       }
  //     })
    
  // }
  // getUser(email: string) {
  //   this.accService.getUserProfile(email).subscribe((res) => {
  //     this.userDetail = res;
  //     this.accService.getAcountDetails(res.UserID).subscribe((acc) => {
  //       this.globalService.setAccounts(acc);
  //       this.accService.getAccountAdminProfile(email).subscribe(mngr => {
  //         this.globalService.setAccountAdminProfile(mngr)
          
  //         this.showSpinner =false
  //         this.router.navigate(['/dashboard/home'], {
  //           queryParamsHandling: 'preserve',
  //         });
  //       })

  //     });
  //     this.globalService.setUserProfile(res);
  //   });
  // }
  resetError(key: string) {
    // this.validationErrors = this.validationErrors.filter((x) => x.Key != key);
    // if (
    //   this.validationErrors.filter((x) => x.Key == 'otp').length ===
    //   this.validationErrors.length
    // ) {
    //   this.validationErrors = [];
    // }
    this.validationErrors = [];
  }
  showErrors() {
  }
  validateInput() {
    //let result: Errors[] = [];
    if (this.otp == '' || this.otp.length!=6 )
      this.validationErrors.push({ Key: 'otp', Error: 'Please enter the code.' });
    //result = this.validationService.validateLogin(this.otp);
    //return result;
  }
  startTimer() {
    if (this.starttimer){ 
    this.interval = setInterval(() => {
      this.showSpinner=false;
      this.router.navigate(['/multifactorauthentication']);
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 20;
      }
    },1000)
  }
}



  pauseTimer() {
    clearInterval(this.interval);
  }





}
