import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../accounts/account.service';
import { SettingsService } from '../settings.service';
import { NotificationSettings } from '../../interfaces';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public userDataFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });
  public notificationSettings: NotificationSettings = null;
  public updated = false;
  public errorsText: string;
  private readonly errorTextSample = 'Something went wrong. Please try again later';

  constructor(private accountService: AccountService, private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.accountService.getCurrentUser$().subscribe(user => {
      this.userDataFormGroup.patchValue({username: user.username});
    });
    this.settingsService.getNotificationSettings().subscribe(data => {
      this.notificationSettings = data;
    }, error => {
      this.notificationSettings = {
        new_comment: true,
        comment_reply: true
      };
    });
  }

  public updateSettings() {
    if (this.userDataFormGroup.valid) {
      console.log(this.notificationSettings);
      this.settingsService.updateNotificationSettings(this.notificationSettings).subscribe(() => this.updated = true
        , err => {
          this.updated = false;
          this.errorsText = this.errorTextSample;
        });
      this.settingsService.updateUsername(this.userDataFormGroup.value.trim()).subscribe(() => this.updated = true
        , err => {
          this.updated = false;
          this.errorsText = this.errorTextSample;
        });
    } else {
      this.errorsText = 'Invalid value for username';
    }
  }
}
