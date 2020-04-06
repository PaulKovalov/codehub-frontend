import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileNavbarComponent } from './profile-navbar/profile-navbar.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';


@NgModule({
  declarations: [
    ProfileNavbarComponent,
    NewArticleComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    EditorModule,
    FormsModule
  ],
  exports: []
})
export class ProfileModule {
}
