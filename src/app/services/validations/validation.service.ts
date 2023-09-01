import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { ContactUs } from 'src/app/model/common/contactus';
import { Errors } from 'src/app/model/common/errors';
import { ForgotPassword } from 'src/app/model/common/forgotpassword';
import { LoginData } from 'src/app/model/common/logindata';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}
  validateChangePassword(passwords: ForgotPassword, confirmPassword:string): Errors[] {
    let errors: Errors[] = [];
    if (passwords.Email === null || passwords.Email === '')
      errors.push({ Key: 'email', Error: 'Invalid Email, Use correct URL.' });
    if (passwords.NewPassword == '')
      errors.push({ Key: 'password',Error: 'Password field is required.'});
    else {
      let patternsS = '[a-z]';
      let patternL = '[A-Z]';
      let patternN = '[0-9]';
      let patternSpl = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (
        passwords.NewPassword?.length! < 8 ||
        passwords.NewPassword?.length! > 24 ||
        !passwords.NewPassword?.match(patternsS) ||
        !passwords.NewPassword?.match(patternL) ||
        !passwords.NewPassword?.match(patternN) ||
        !passwords.NewPassword?.match(patternSpl)
      )
      errors.push({ Key: 'password',Error:"The password you entered doesn't meet the minimum security requirements."});
    }
    if (passwords.OldPassword == '')
      errors.push({ Key: 'oldpassword',Error: 'Password field is required.'});
    if (confirmPassword == '')
      errors.push({ Key: 'confirmpassword',Error: 'Password field is required.'});
    if ((passwords.NewPassword != '' && confirmPassword !='') )
    {
      if(passwords.NewPassword != confirmPassword)
      {
      errors.push({ Key: 'password',Error: 'The Password confirmation does not match.'});
      errors.push({ Key: 'confirmpassword',Error: 'The Password confirmation does not match.'});
      }
      else if(passwords.OldPassword == passwords.NewPassword)
      {
        errors.push({ Key: 'oldpassword',Error: 'New Password must be different from Current Password.'});
        errors.push({ Key: 'password',Error: 'New Password must be different from Current Password.'});
      }
    }
      return errors;
  }
  validateResetPassword(passwords: ForgotPassword): Errors[] {
    let errors: Errors[] = [];
    if (passwords.Email === null || passwords.Email === '')
      errors.push({ Key: 'email', Error: 'Invalid Email, Use correct URL.' });
    if (passwords.OldPassword == '')
      errors.push({ Key: 'password',Error: 'Password field is required.'});
    else {
      let patternsS = '[a-z]';
      let patternL = '[A-Z]';
      let patternN = '[0-9]';
      let patternSpl = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (
        passwords.OldPassword?.length! < 8 ||
        passwords.OldPassword?.length! > 24 ||
        !passwords.OldPassword?.match(patternsS) ||
        !passwords.OldPassword?.match(patternL) ||
        !passwords.OldPassword?.match(patternN) ||
        !passwords.OldPassword?.match(patternSpl)
      )
      errors.push({ Key: 'password',Error: 'Please enter valid password.'});
    }
    if (passwords.NewPassword == '')
      errors.push({ Key: 'confirmpassword',Error: 'Password field is required.'});
    if (passwords.OldPassword != passwords.NewPassword)
    {
      errors.push({ Key: 'password',Error: 'Passwords does not match.'});
      errors.push({ Key: 'confirmpassword',Error: 'Passwords does not match.'});
    }
      return errors;
  }
  validateContactUs(value: ContactUs): Errors[]{
    let result: Errors[] = [];
// firstName
    // lastName
    // email
    // subject
    // message

    if (value.FirstName == '')
        result.push({ Key: 'firstName', Error: 'Please enter Mandatory fields.' });
        if (value.LastName == '')
        result.push({ Key: 'lastName', Error: 'Please enter Mandatory fields.' });
        if (value.Interests == '')
        result.push({ Key: 'subject', Error: 'Please enter Mandatory fields.' });
        if (value.Message == '')
        result.push({ Key: 'message', Error: 'Please enter Mandatory fields.' });

    if (value.Email == '')
      result.push({ Key: 'email', Error: 'Please enter Mandatory fields.' });
    else {
      let pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
      if (!value.Email.toLocaleLowerCase().match(pattern)) {
        result.push({ Key: 'email', Error: 'Please enter valid Email.' });
      }
    }
    return result;
    return [];
  }
  
  validateLogin(value: LoginData): Errors[] {
    let result: Errors[] = [];
    if (value.Email == '')
      result.push({ Key: 'email', Error: 'Please enter Business Email.' });
    else {
      let pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
      if (!value.Email.toLocaleLowerCase().match(pattern)) {
        result.push({ Key: 'email', Error: 'Please enter valid Email.' });
      }
    }
    if (value.Password == '')
      result.push({ Key: 'password', Error: 'Please enter Password.' });
      else {
        let pattern = '((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,24})';
        if(value.Password.length<8 || value.Password.length>24){
        result.push({ Key: 'password', Error: 'Please enter valid Password.' });
      }
    }
    return result;

  }
  validateForgotPassword(value: LoginData): Errors[] {
    let result: Errors[] = [];
    if (value.Email == '')
      result.push({ Key: 'email', Error: 'Please enter Business Email.' });
    else {
      let pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
      if (!value.Email.toLocaleLowerCase().match(pattern)) {
        result.push({ Key: 'email', Error: 'Please enter valid Email.' });
      }
    }
    return result;
  }

}
