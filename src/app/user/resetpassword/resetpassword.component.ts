import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors } from 'src/app/model/common/errors';
import { ForgotPassword } from 'src/app/model/common/forgotpassword';
import { LoginData } from 'src/app/model/common/logindata';
import { DataComponent } from 'src/app/model/samples/data';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/common/global.service';
import { AccountService } from 'src/app/services/user/accounts.service';
import { ValidationService } from 'src/app/services/validations/validation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  showSpinner = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private accServ: AccountService,
    private router: Router,
    private globalservice: GlobalService,
    private validationService: ValidationService
  ) {}
  hide = true;
  env = environment;
  imageObject: any;
  email = '';
  enableSlideButton = false;
  validationErrors: Errors[] = [];
  myOptions = {
    placement: 'right',
    showDelay: 50,
    hideDelay: 500,
    width: '170px',
    'tooltip-class': 'tooltipCss',
  };
  passwordInfo = DataComponent.Tooltip;
  resetPasswordForm : FormGroup
  errors: string[] = [];
  isSuccess = false;
  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl(''),
      confirmpassword: new FormControl(''),
    });
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('email')) {
        this.email = params.get('email')!;
      }
    });
  }
  // ResetPassword(event: any) {
  //   this.showSpinner=true;
  //   event.preventDefault();
  //   let forgotData: ForgotPassword;
  //   forgotData = {
  //       Email: this.email,
  //       OldPassword: this.resetPasswordForm.value.password!,
  //       NewPassword : this.resetPasswordForm.value.confirmpassword!
  //     };

  //   this.validationErrors = [];
  //   this.validationErrors = this.validateInput(forgotData);
  //   this.showErrors();
  //   if (this.validationErrors.length == 0) {
  //     // this.auth.getUserProfile(this.email).subscribe((user) => {
  //     //   this.accServ.getAcountDetails(user.UserID).subscribe((acc) => {
  //     //     if (acc == null || acc.length == 0) {
  //     //       //this.isvalidform = false;
  //     //       this.validationErrors.push({
  //     //         Key: 'all',
  //     //         Error: 'Password Update Failed! Contact Admin for more details.',
  //     //       });
  //     //       return;
  //     //     }
  //     this.accServ.resetPassword(forgotData).subscribe((res) => {
  //       if (res.success) {
  //         let loginData:LoginData
  //         loginData = {
  //           Email:this.email,
  //           Password:this.resetPasswordForm.value.password!
  //         }
          
           
  //         this.globalservice.loginDetails$.subscribe((x) => x);
  //         this.globalservice.loginDetails$.next(loginData);
  //         this.showSpinner=false;
  //         this.router.navigate(['/resetsuccess'], {
  //           queryParamsHandling: 'preserve',
  //         });
        
  //       } else {
  //         this.isSuccess = false;
  //       }
  //   //   })
  //   // })
  //     });
      
  //   }
  //   else
  //   this.showSpinner=false;
  // }
  formValues = new Map<string, string>();
  resetError(key: string) {
    let removeError = false;
    if (this.formValues.has(key)) {
      let val: string = this.formValues.get(key)!;
      if (val != this.resetPasswordForm.get(key)!.value) {
        removeError = true;
        this.formValues.set(key, this.resetPasswordForm.get(key)!.value);
      } else {
        removeError = false;
      }
    } else {
      if (this.resetPasswordForm.get(key)!.value === '') {
        removeError = false;
      } else {
        removeError = true;
        this.formValues.set(key, this.resetPasswordForm.get(key)!.value);
      }
    }

    if (!removeError) return;
    this.validationErrors = this.validationErrors.filter((x) => (x.Key != key && x.Key != "email"));
    // if (
    //   this.validationErrors.filter((x) => x.Key == 'all').length ===
    //   this.validationErrors.length
    // ) {
    //   this.validationErrors = [];
    // }
    this.validationErrors = [];
  }
  showErrors() {
    let validations:Errors[] = []
    this.validationErrors.forEach((element) => {
      if (element.Key === 'all') {
        this.resetPasswordForm.controls["password"].setErrors({ incorrect: true });
        this.resetPasswordForm.controls["password"].markAsTouched();
        this.resetPasswordForm.controls["confirmpassword"].setErrors({ incorrect: true });
        this.resetPasswordForm.controls["confirmpassword"].markAsTouched();
      } 
      else if(element.Key === 'email') {
       
      }
      else{
        this.resetPasswordForm.controls[element.Key].setErrors({ incorrect: true });
        this.resetPasswordForm.controls[element.Key].markAsTouched();
      }
      if(!validations.some(i=> i.Error==element.Error)){
        validations.push(element)
      }
    });
    this.validationErrors = validations;
  }
  validateInput(data : ForgotPassword) {
    
    let result: Errors[] = [];

    result = this.validationService.validateResetPassword(data);
    return result;
  }
}
