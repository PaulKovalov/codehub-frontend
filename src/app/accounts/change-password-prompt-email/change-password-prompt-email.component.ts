import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PasswordChangeService } from '../password-change.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password-prompt-email',
  templateUrl: './change-password-prompt-email.component.html',
  styleUrls: ['../account-styles.scss']
})
export class ChangePasswordPromptEmailComponent implements OnInit {
  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public errorsText: string;

  constructor(private passwordService: PasswordChangeService, private router: Router) {
  }

  ngOnInit() {
  }

  public sendRequest() {
    if (this.emailFormControl.valid) {
      const email = this.emailFormControl.value;
      this.passwordService.requestPasswordChange(email).subscribe(() => {
        this.router.navigateByUrl('password-change-request-sent');
      }, (error => this.errorsText = 'Something went wrong. Please try again later'));
    }
  }
}
