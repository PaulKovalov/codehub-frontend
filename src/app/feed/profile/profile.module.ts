import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileNavbarComponent } from './profile-navbar/profile-navbar.component';
import { NewArticleComponent } from './new-article/new-article.component';


@NgModule({
  declarations: [
    ProfileNavbarComponent,
    NewArticleComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule {
}
