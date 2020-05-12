import { Component, OnInit } from '@angular/core';
import { PasswordChangeService } from '../password-change.service';

@Component({
  selector: 'app-change-password-request-sent',
  templateUrl: './change-password-request-sent.component.html',
  styleUrls: ['../account-styles.scss']
})
export class ChangePasswordRequestSentComponent implements OnInit {
  public email: string;

  constructor(private passwordService: PasswordChangeService) {
  }

  ngOnInit() {
    this.email = this.passwordService.getEmail();
  }

}
