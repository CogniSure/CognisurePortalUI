import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/app-config-service';
import { Errors } from 'src/app/model/common/errors';
import { ForgotPassword } from 'src/app/model/common/forgotpassword';
import { LoginData } from 'src/app/model/common/logindata';
import { DataComponent } from 'src/app/model/samples/data';
import { GlobalService } from 'src/app/services/common/global.service';
import { AccountService } from 'src/app/services/user/accounts.service';
import { ValidationService } from 'src/app/services/validations/validation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {
  showSpinner = false;

  constructor(
    private accServ: AccountService,
    private router: Router,
    private globalService: GlobalService,
    private validationService: ValidationService,
    private configService:AppConfigService
  ) {}

  validationErrors: Errors[] = [];
  forgotPasswordForm = new FormGroup({
    email: new FormControl(''),
  });
  isSuccess = true;
  env = environment;
  imageObject: any;
  enableSlideButton = false;
  forgotPasswordInput: ForgotPassword;
  myOptions = {
    placement: 'right',
    showDelay: 50,
    hideDelay: 500,
    width: '180px',
    'tooltip-class': 'tooltipCss',
  };
  passwordInfo = DataComponent.Tooltip;

  ngOnInit(): void {}

  imageClickHandler(val: any) {
    this.enableSlideButton = val;
  }
  // forgotpassword(event: any) {
  //   this.showSpinner=true;
  //   event.preventDefault();
  //   this.validationErrors = [];
  //   this.validationErrors = this.validateInput();
  //   this.showErrors();
  //   if (this.validationErrors.length == 0) {
  //   this.accServ
  //     .forgotPassword(this.forgotPasswordForm.value)
  //     .subscribe((res) => {
  //       this.forgotPasswordInput = {
  //         Email: this.forgotPasswordForm.value.email!,
  //         OldPassword: '',
  //         NewPassword: '',
  //       };
  //       if (res.success) {
  //         this.globalService.password$.subscribe((x:any) => x);
  //         this.globalService.password$.next(this.forgotPasswordInput);
  //         this.router.navigate(['/emailsent'], {
  //           queryParamsHandling: 'preserve',
  //         });
  //       } else {
  //         this.isSuccess = false;
  //       }
  //     });
  //   }
  //   else
  //   this.showSpinner=false;
  // }
  forgotpassword() {
    this.showSpinner = true;
    this.validationErrors = [];
    this.validationErrors = this.validateInput();
    this.showErrors();
    if (this.validationErrors.length == 0) {
      const email = this.forgotPasswordForm.get('email')?.value;
      if (email) { // Check if email is not null or undefined
        this.accServ.forgotPassword(email).subscribe((res) => {
          this.forgotPasswordInput = {
            Email: email,
            OldPassword: '',
            NewPassword: '',
          };
          if (res.success) {
            this.globalService.password$.subscribe((x: any) => x);
            this.globalService.password$.next(this.forgotPasswordInput);
            this.router.navigate(['/emailsent'], {
              queryParamsHandling: 'preserve',
            });
          } else {
            this.isSuccess = false;
          }
        });
      } else {
        // Handle the case when email is null or undefined (optional)
        console.error('Email is null or undefined');
        this.showSpinner = false;
      }
    } else {
      this.showSpinner = false;
    }
  }
  
  
  
  formValues = new Map<string, string>()
  resetError(key: string, $event:any) {
    let removeError = false
    if(this.formValues.has(key))
    {
      let val:string  = this.formValues.get(key)!
      if(val!=this.forgotPasswordForm.get(key)!.value)
      {
        removeError = true
        this.formValues.set(key,this.forgotPasswordForm.get(key)!.value)
      }
        else{
          removeError = false
        }
    }
    else{
      if(this.forgotPasswordForm.get(key)!.value === "")
    {
      removeError = false
    }
      else{
        removeError = true
      this.formValues.set(key,this.forgotPasswordForm.get(key)!.value)
      }
      this.showSpinner=false;
    }
    
    if(!removeError) return
    this.validationErrors = this.validationErrors.filter((x) => x.Key != key);
    if (
      this.validationErrors.filter((x) => x.Key == 'all').length ===
      this.validationErrors.length
    ) {
      this.validationErrors = [];
    }
    this.showSpinner=false;
  }
  showErrors() {
    this.validationErrors.forEach((element) => {
      if (element.Key === 'email') {
        this.forgotPasswordForm.controls[element.Key].setErrors({
          incorrect: true,
        });
        this.forgotPasswordForm.controls[element.Key].markAsTouched();
      }
    });
  }
  validateInput(): Errors[] {
    let loginData: LoginData = {
      Email: this.forgotPasswordForm.value.email!,
      Password: "",
    };
    let result: Errors[] = [];

    result = this.validationService.validateForgotPassword(loginData);
    return result;
  }
  imagesrc = 'assets/images/registrationsample1.jpg';
  imagesrc1 = 'assets/images/registrationsample2.jpg';
  imagesrc2 = 'assets/images/registrationsample3.jpg';
  imagesrc3 = 'assets/images/email.png';
  imagesrc4 = 'assets/images/password.png';
}
