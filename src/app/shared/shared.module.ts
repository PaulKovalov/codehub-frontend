import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NavbarComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ClickOutsideModule
  ]
})
export class SharedModule {
}
