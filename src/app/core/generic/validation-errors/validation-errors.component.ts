import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {ValidatorErrorMessage} from '../utils/validators-utils'

@Component({
  selector: 'app-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.scss']
})
export class ValidationErrorsComponent implements OnChanges {

@Input() errors : Record<string,string> | null = {};
@Input() customErrorMessages : Record<string,string> | null = {};
@Input() control!: AbstractControl
// errorMessages : Record<string,string> = {
//   required : "This field is Required.",
//   email : "Invalid Email",
// }
ngOnChanges(changes: SimpleChanges): void {
  // const {customErrorMessages} = changes;
  // if(customErrorMessages){
  //   this.errorMessages={
  //     ...this.errorMessages,
  //     ...customErrorMessages.currentValue
  //   }
  // }
}
// get errorMessage() {
//   this.errorMessages = {}
//   for (const validatorName in this.errors) {
//               return ValidatorErrorMessage(validatorName, this.control.errors[validatorName]);
//         }
//         return null;
//   }
// }
get errorMessage() {  
    for (const validatorName in this.control?.errors) {
        if(this.control.touched)
          
          return ValidatorErrorMessage(validatorName, this.control.errors[validatorName]);
    }
    return null;
  }

 }
