import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordRequestSentComponent } from './change-password-request-sent/change-password-request-sent.component';
import { ChangePasswordPromptEmailComponent } from './change-password-prompt-email/change-password-prompt-email.component';
import { ChangePasswordPromptPasswordComponent } from './change-password-prompt-password/change-password-prompt-password.component';
import { ChangePasswordResultComponent } from './change-password-result/change-password-result.component';


const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'sign-in',
    component: LoginComponent
  },
  {
    path: 'password-change-request',
    component: ChangePasswordPromptEmailComponent,
  },
  {
    path: 'password-change-request-sent',
    component: ChangePasswordRequestSentComponent,
  },
  {
    path: 'password-change-new',
    component: ChangePasswordPromptPasswordComponent,
  },
  {
    path: 'password-change-result-ok',
    component: ChangePasswordResultComponent,
    data: {mode: 'ok'}
  },
  {
    path: 'password-change-result-fail',
    component: ChangePasswordResultComponent,
    data: {mode: 'fail'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule {
}
