import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors } from 'src/app/model/common/errors';
import { ForgotPassword } from 'src/app/model/common/forgotpassword';
import { LoginData } from 'src/app/model/common/logindata';
import { DataComponent } from 'src/app/model/samples/data';
import { UserProfile } from 'src/app/model/profile/userprofile';
import { GlobalService } from 'src/app/services/common/global.service';
import { AccountService } from 'src/app/services/user/accounts.service';
import { ValidationService } from 'src/app/services/validations/validation.service';
import { environment } from 'src/environments/environment';
import { PasswordToolTip } from '../../model/constants/tooltipDetails';
import { matchValidator } from 'src/app/core/generic/utils/match-validator';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})
export class ChangepasswordComponent implements OnInit {
  showSpinner = false;
  tooltip = PasswordToolTip;
  constructor(
    private route: ActivatedRoute,
    private accServ: AccountService,
    private router: Router,
    private globalService: GlobalService,
    private validationService: ValidationService,
    private formBuilder: FormBuilder
  ) {}
  hideOld = true;
  hideNew = true;
  hideNewRepeat = true;
  validationErrors: string[] = [];
  env = environment;
  imageObject: any;
  email = '';
  enableSlideButton = false;
  myOptions = {
    placement: 'right',
    showDelay: 50,
    hideDelay: 500,
    width: '170px',
    'tooltip-class': 'tooltipCss',
  };
  passwordInfo = DataComponent.Tooltip;
  resetPasswordForm: FormGroup;
  errors: string[] = [];
  isSuccess = false;
  userProfile: UserProfile;
  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group(
      {
        oldpassword: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          //Validators.pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/),
        ]),
        confirmpassword: new FormControl('', [
          Validators.required,
          //Validators.pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/),
          matchValidator('password')
        ]),
      }
    );
    const value = localStorage.getItem('UserDetail');
    if (value != null) {
      this.userProfile = JSON.parse(value);
    }
  }
  ChangePassword(event: any) {
    this.showSpinner = true;
    event.preventDefault();
    let loginData: ForgotPassword;
    loginData = {
      //Email: this.userProfile.Email,
      Email : "submissiontesting@cognisure.ai",
      OldPassword: this.resetPasswordForm.value.oldpassword!,
      NewPassword: this.resetPasswordForm.value.password!,
    };
    this.validationErrors = [];
    // this.validationErrors = this.validateInput(loginData,this.resetPasswordForm.value.confirmpassword!);
    // this.showErrors();
    if (this.validationErrors.length == 0) {
      this.accServ
        .changePassword(
          //this.userProfile.UserID,
          852,
          this.resetPasswordForm.value.oldpassword!,
          this.resetPasswordForm.value.password!
        )
        .subscribe((res) => {
          if (res.success) {
            this.showSpinner = false;
            let loginData: LoginData;
            loginData = {
              Email: this.userProfile.Email,
              Password: this.resetPasswordForm.value.password!,
            };

            this.globalService.loginDetails$.subscribe((x: any) => x);
            this.globalService.loginDetails$.next(loginData);
            this.router.navigate(['/resetsuccess'], {
              queryParamsHandling: 'preserve',
            });
          } else {
            this.isSuccess = false;
            this.validationErrors.push('Password Updation failed!!');
          }
        });
    } else this.showSpinner = false;
  }
  formValues = new Map<string, string>();
  // resetError(key: string) {
  //   let removeError = false;
  //   if (this.formValues.has(key)) {
  //     let val: string = this.formValues.get(key)!;
  //     if (val != this.resetPasswordForm.get(key)!.value) {
  //       removeError = true;
  //       this.formValues.set(key, this.resetPasswordForm.get(key)!.value);
  //     } else {
  //       removeError = false;
  //     }
  //   } else {
  //     if (this.resetPasswordForm.get(key)!.value === '') {
  //       removeError = false;
  //     } else {
  //       removeError = true;
  //       this.formValues.set(key, this.resetPasswordForm.get(key)!.value);
  //     }
  //       this.showSpinner=false;
  //   }

  //   if (!removeError) return;
  //   this.validationErrors = this.validationErrors.filter((x) => (x.Key != key && x.Key != "email"));
  //   // if (
  //   //   this.validationErrors.filter((x) => x.Key == 'all').length ===
  //   //   this.validationErrors.length
  //   // ) {
  //   //   this.validationErrors = [];
  //   // }
  //   this.validationErrors = [];
  // }
  // showErrors() {
  //   let validations:Errors[] = []
  //   this.validationErrors.forEach((element) => {
  //     if (element.Key === 'all') {
  //       this.resetPasswordForm.controls["password"].setErrors({ incorrect: true });
  //       this.resetPasswordForm.controls["password"].markAsTouched();
  //       this.resetPasswordForm.controls["confirmpassword"].setErrors({ incorrect: true });
  //       this.resetPasswordForm.controls["confirmpassword"].markAsTouched();
  //     }
  //     else if(element.Key === 'email') {

  //     }
  //     else{
  //       this.resetPasswordForm.controls[element.Key].setErrors({ incorrect: true });
  //       this.resetPasswordForm.controls[element.Key].markAsTouched();
  //     }
  //     if(!validations.some(i=> i.Error==element.Error)){
  //       validations.push(element)
  //     }
  //   });
  //   this.validationErrors = validations;
  //   this.showSpinner=false;
  // }
  validateInput(data: ForgotPassword, confirmPassword: string) {
    let result: Errors[] = [];

    result = this.validationService.validateChangePassword(
      data,
      confirmPassword
    );
    this.showSpinner = false;
    return result;
  }
}
