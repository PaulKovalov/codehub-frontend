import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { getFormValidationErrors, sortErrors } from '../userform-utils';
import { Router } from '@angular/router';
import { UserData } from '../interfaces';


const passwordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const newPassword = control.get('password');
  const confirmNewPassword = control.get('confirmPassword');
  return newPassword && confirmNewPassword && newPassword.value !== confirmNewPassword.value ? {passwordMatchValidator: true}:null;
};

interface FormError {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const errorsNamesMapping: FormError = {
  username: 'Username',
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Confirm Password'
};

const controlErrorsOrder = {
  username: 0,
  email: 1,
  password: 2,
  confirmPassword: 3
};

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../account-styles.scss']
})
export class RegistrationComponent implements OnInit {
  public errorsText: string;
  public userDataFormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ]),
  }, {validators: passwordMatchValidator});

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
  }

  public register() {
    if (this.userDataFormGroup.valid) {
      this.accountService.registerUser(this.userDataFormGroup.value as UserData).subscribe(() => {
        this.accountService.updateAuthState();
        this.router.navigateByUrl('/');
      }, (err) => {
        this.errorsText = 'Error occured';
      });
    } else {
      this.errorsText = this.parseErrors(this.userDataFormGroup);
    }
  }


  private parseErrors(userForm: FormGroup) {
    let errorText = '';
    const errors = getFormValidationErrors(userForm);
    sortErrors(controlErrorsOrder, errors);
    errors.forEach((error) => {
      if (error.error !== undefined) {
        const fieldName = errorsNamesMapping[error.control as keyof FormError] || error.control;
        switch (error.error) {
          case 'required':
            errorText = `${fieldName} required`;
            break;
          case 'email':
            errorText = 'Invalid email address';
            break;
        }
        return errorText;
      } else {
        if (error.passwordMatchValidator !== undefined) {
          errorText = `Passwords doesn\'t match\n`;
        }
      }
    });
    return errorText;
  }
}
