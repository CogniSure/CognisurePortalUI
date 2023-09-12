import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'validation-summary',
  templateUrl: './validation-summary.component.html',
  styleUrls: ['./validation-summary.component.scss']
})
export class ValidationSummaryComponent implements OnInit{
  @Input() public form: FormGroup;
  @Input() public errors: string[] = [];

  ngOnInit(): void {
    // this.generateErrorMessages();

    this.form.statusChanges.subscribe(() => {
        this.resetErrorMessages();
    //   this.generateErrorMessages();
    });
  }

  resetErrorMessages(): void {
    this.errors.length = 0;
  }
  
  // generateErrorMessages(): void {
  //   const controlNames = Object.keys(this.form.controls);

  //   controlNames.forEach((controlName) => {
  //     let control = this.form.controls[controlName];
  //     let errors = control.errors;

  //     if (errors === null || errors.length === 0) {
  //       return;
  //     }

  //     if (errors.required) {
  //       this.errors.push(`${controlName} is required`);
  //     }

  //     if (errors.minlength) {
  //       this.errors.push(
  //         `${controlName} minimum length is ${errors.minlength.requiredLength}.`
  //       );
  //     }

  //     if (errors.email) {
  //       this.errors.push(`${controlName} is not a valid email`);
  //     }
  //   });
  // }
}
