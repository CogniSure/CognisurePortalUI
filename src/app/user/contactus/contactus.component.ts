import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { take } from 'rxjs/operators';
import { UserProfile } from 'src/app/model/profile/userprofile';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactUs } from 'src/app/model/common/contactus';
import { AccountService } from 'src/app/services/user/accounts.service';
import { Errors } from 'src/app/model/common/errors';
import { ValidationService } from 'src/app/services/validations/validation.service';
import { CSSelect } from 'src/app/model/common/select';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
})
export class ContactusComponent implements OnInit {
  showSpinner = false;
  contactusForm: FormGroup;
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
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {}
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  //isInvalid = false;
  subjects : CSSelect[] = [
    {ID:1,Value:'Error - Login'},
    {ID:2,Value:'Error - Page Loading'},
    {ID:3,Value:'Error - Incorrect Data'},
    {ID:4,Value:'Error - Others'},
    {ID:5,Value:'Query'},
    {ID:6,Value:'Feedback'},
  ];
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
    this.contactusForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      message:new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
    const id = this.route.snapshot.paramMap.get('pageId');
    if (Number(id) == 2) {
      this.isLoggedIn = true;
      this.userDetail = JSON.parse(sessionStorage.getItem('UserDetail')!);
      if (this.userDetail != null) {
        this.contactusForm
          .get('firstName')!
          .patchValue(this.userDetail.FirstName);
        this.contactusForm
          .get('lastName')!
          .patchValue(this.userDetail.LastName);
        this.contactusForm.get('email')!.patchValue(this.userDetail.Email);

        this.cdRef.detectChanges();
      }
    } else this.isLoggedIn = false;
    this.contactusForm.markAsUntouched();
    this.contactusForm.reset();
    this.cdRef.detectChanges();
  }
  submitForm() {
    this.showSpinner = true;
    let input: ContactUs;
    let formValue: any = this.contactusForm.value;
    console.log('Contact Us Form Data : ');
    console.log(formValue);
    input = {
      FirstName: formValue.firstName,
      LastName: formValue.lastName,
      Email: formValue.email,
      Interests: formValue.subject,
      Message: formValue?.message,
      CompanyName: '',
      Designation: '',
      MiddleName: '',
      PhoneNumber: '',
    };
    // this.validationErrors = [];
    // this.validationErrors = this.validateInput();
    // this.showErrors();
    if (this.validationErrors.length == 0) {
      this.userService.contactUs(input).subscribe((res: { success: any }) => {
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
}
