import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { take } from 'rxjs/operators';
import { UserProfile } from 'src/app/model/profile/userprofile';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactUs } from 'src/app/model/common/contactus';
import { AccountService } from 'src/app/services/user/accounts.service';
import { Errors } from 'src/app/model/common/errors';
import { ValidationService } from 'src/app/services/validations/validation.service';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
})
export class ContactusComponent implements OnInit {
  showSpinner = false;
  messageForm =  new FormGroup({
    message: new FormControl(''),
  });
  contactusForm: FormGroup;
   
 // ({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   email: new FormControl(''),
  //   subject: new FormControl(''),
  //   message: new FormControl(''),
  // });
  @ViewChild('message') messageElement: ElementRef;
  validationErrors: Errors[] = [];
  userDetail: UserProfile;
  backUrl = '/login';
  backText = '';
  isLoggedIn = false;
  constructor(
    private _ngZone: NgZone,
    private route: ActivatedRoute,
    private userService: AccountService,
    private validationService: ValidationService,
    private router: Router,
    private cdRef:ChangeDetectorRef
  ) {}
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  //isInvalid = false;
  subjects = [
    'Error - Login',
    'Error - Page Loading',
    'Error - Incorrect Data',
    'Error - Others',
    'Query',
    'Feedback',
  ];
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
    this.contactusForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      subject: new FormControl(''),
    });
    const id = this.route.snapshot.paramMap.get('pageId');
    if (Number(id) == 2) {
      this.isLoggedIn = true;
      this.userDetail = JSON.parse(sessionStorage.getItem('UserDetail')!);
      if (this.userDetail != null) {
        this.contactusForm.get('firstName')!.patchValue(this.userDetail.FirstName);
        this.contactusForm.get('lastName')!.patchValue(this.userDetail.LastName);
        this.contactusForm.get('email')!.patchValue(this.userDetail.Email);
        
      this.cdRef.detectChanges()
      }
    } else this.isLoggedIn = false;
  }
  submitForm() {
    this.showSpinner = true;
    let input: ContactUs;
    let formValue: any = this.contactusForm.value;
    console.log("Contact Us Form Data : ")
    console.log(formValue)
    let message = this.messageForm.getRawValue().message; 
    input = {
      FirstName: formValue.firstName,
      LastName: formValue.lastName,
      Email: formValue.email,
      Interests: formValue.subject,
      Message: message!.toString(),
      CompanyName: '',
      Designation: '',
      MiddleName: '',
      PhoneNumber: '',
    };
    this.validationErrors = [];
    this.validationErrors = this.validateInput();
    this.showErrors();
    if (this.validationErrors.length == 0) {
      this.userService.contactUs(input).subscribe((res: { success: any; }) => {
        if (res.success) {
          this.contactusForm.reset();
          this.showSpinner = false;
          if (this.isLoggedIn)
            this.router.navigate(['/dashboard/home'], {
              queryParamsHandling: 'preserve',
            });
          else
            this.router.navigate(['/login'], {
              queryParamsHandling: 'preserve',
            });
        }
      });
    } else this.showSpinner = false;
  }
  formValues = new Map<string, string>();
  resetMessage(key: string) {
    
    let removeError = false;
    if (this.contactusForm.get(key)!.value === '') {
      removeError = false;
    } else {
      removeError = true;
      this.formValues.set(key, this.contactusForm.get(key)!.value);
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
  resetError(key: string) {
    let removeError = false;
    if (this.formValues.has(key)) {
      let val: string = this.formValues.get(key)!;
      if (val != this.contactusForm.get(key)!.value) {
        removeError = true;
        this.formValues.set(key, this.contactusForm.get(key)!.value);
      } else {
        removeError = false;
      }
    } else {
      if (this.contactusForm.get(key)!.value === '') {
        removeError = false;
      } else {
        removeError = true;
        this.formValues.set(key, this.contactusForm.get(key)!.value);
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
    let validations: Errors[] = [];
    this.validationErrors.forEach((element) => {
      if (element.Key === 'message') {
        this.messageForm.controls[element.Key].setErrors({ incorrect: true });
        this.messageForm.controls[element.Key].markAsTouched();
      } else {
        this.contactusForm.controls[element.Key].setErrors({ incorrect: true });
        this.contactusForm.controls[element.Key].markAsTouched();
      }

      if (!validations.some((i) => i.Error == element.Error)) {
        validations.push(element);
      }
    });
    this.validationErrors = validations;
  }
  validateInput(): Errors[] {
    let loginData: ContactUs = {
      FirstName: this.contactusForm.value.firstName!,
      LastName: this.contactusForm.value.lastName!,
      Email: this.contactusForm.value.email!,
      Interests: this.contactusForm.value.subject!,
      Message: this.messageForm.value.message!,
      MiddleName: '',
      PhoneNumber: '',
      CompanyName: '',
      Designation: '',
    };
    let result: Errors[] = [];

    result = this.validationService.validateContactUs(loginData);
    return result;
  }
}
