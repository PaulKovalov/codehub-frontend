import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../accounts/account.service';
import { SettingsService } from '../settings.service';
import { NotificationSettings } from '../../interfaces';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxSmartModalService } from 'ngx-smart-modal';

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
  public currentAvatarUrl = '';
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public updating = false;
  private readonly imageUploadError = 'Something went wrong when loading image';

  constructor(private accountService: AccountService, private settingsService: SettingsService, public ngxSmartModalService: NgxSmartModalService) {
  }

  ngOnInit() {
    this.accountService.getCurrentUser$().subscribe(user => {
      this.userDataFormGroup.patchValue({username: user.username});
      this.currentAvatarUrl = user.avatar;
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

  public fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  public imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  public imageLoaded() {
  }

  public loadImageFailed() {
    alert(this.imageUploadError);
  }

  public resetImage() {
    this.imageChangedEvent = null;
    this.croppedImage = '';
  }

  public updateUserAvatar() {

    if (this.croppedImage) {
      this.updating = true;
      this.settingsService.updateAvatar(this.croppedImage).subscribe(data => {
        this.currentAvatarUrl = data.avatar;
        this.ngxSmartModalService.getModal('changeAvatarModal').close();
        this.updating = false;
      }, error => {
        console.log(error.error);
        if (error.error.avatar) {
          alert(error.error.avatar[0]);
        } else {
          alert(this.errorTextSample);
        }
      });
    }
  }
}
