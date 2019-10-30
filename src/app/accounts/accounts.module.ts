import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountsRoutingModule} from './accounts-routing.module';
import {RegistrationComponent} from './registration/registration.component';


@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule {
}
