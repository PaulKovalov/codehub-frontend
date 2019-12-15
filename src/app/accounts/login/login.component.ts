import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {getFormValidationErrors, sortErrors} from '../userform-utils';
import {AccountService} from '../account.service';
import {BaseUserData} from '../../interfaces/user-data';
import {Router} from '@angular/router';

interface FormError {
  email: string;
  password: string;
}

const errorsNamesMapping: FormError = {
  email: 'Email',
  password: 'Password',
};

const controlErrorsOrder = {
  email: 0,
  password: 1,
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../account-styles.scss']
})
export class LoginComponent implements OnInit {
  public errorsText: string;
  public userDataFormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
  }

  public login() {
    if (this.userDataFormGroup.valid) {
      this.accountService.loginUser(this.userDataFormGroup.value as BaseUserData).subscribe((data: { token: string }) => {
        this.accountService.setAuthToken(data.token);
        this.router.navigateByUrl('/');
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
      }
    });
    return errorText;
  }
}
