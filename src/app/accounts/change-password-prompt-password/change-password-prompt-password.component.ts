import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordChangeService } from '../password-change.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getFormValidationErrors, passwordMatchValidator } from '../userform-utils';

interface FormError {
  password: string;
  confirmPassword: string;
}

const errorsNamesMapping: FormError = {
  password: 'Password',
  confirmPassword: 'Confirm Password'
};

@Component({
  selector: 'app-change-password-prompt-password',
  templateUrl: './change-password-prompt-password.component.html',
  styleUrls: ['../account-styles.scss']
})

export class ChangePasswordPromptPasswordComponent implements OnInit {
  public errorsText: string;
  public passwordsFormGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required,
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ]),
  }, {validators: passwordMatchValidator});

  constructor(private passwordChangeService: PasswordChangeService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.passwordChangeService.setRequestId(params.request_id);
    });
  }

  public changePassword() {
    if (this.passwordsFormGroup.valid) {
      const password = this.passwordsFormGroup.controls.password.value.trim();
      this.passwordChangeService.sendNewPassword(password).subscribe(data => {
        this.router.navigateByUrl('password-change-result-ok');
      }, err => {
        this.router.navigateByUrl('password-change-result-fail');
      });
    } else {
      this.errorsText = this.parseErrors(this.passwordsFormGroup);
    }
  }

  private parseErrors(userForm: FormGroup) {
    let errorText = '';
    const errors = getFormValidationErrors(userForm);
    errors.forEach((error) => {
      if (error.error !== undefined) {
        const fieldName = errorsNamesMapping[error.control as keyof FormError] || error.control;
        errorText = `${fieldName} required`;
      }
      if (error.passwordMatchValidator !== undefined) {
        errorText = `Passwords doesn\'t match\n`;
      }
    });
    return errorText;
  }
}
