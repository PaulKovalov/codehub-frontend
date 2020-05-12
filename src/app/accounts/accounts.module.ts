import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordRequestSentComponent } from './change-password-request-sent/change-password-request-sent.component';
import { ChangePasswordPromptEmailComponent } from './change-password-prompt-email/change-password-prompt-email.component';
import { ChangePasswordPromptPasswordComponent } from './change-password-prompt-password/change-password-prompt-password.component';
import { ChangePasswordResultComponent } from './change-password-result/change-password-result.component';


@NgModule({
  declarations: [RegistrationComponent, LoginComponent, ChangePasswordRequestSentComponent, ChangePasswordPromptEmailComponent, ChangePasswordPromptPasswordComponent, ChangePasswordResultComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    ReactiveFormsModule
  ]
})
export class AccountsModule {
}
