import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { SharedModule } from '../shared/shared.module';
import { ContentService } from './services/content.service';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { ClickOutsideModule } from 'ng-click-outside';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [
    FeedComponent,
    NavbarComponent,
    ArticlePreviewComponent,
    ArticleViewComponent,
    ArticlesListComponent,
  ],
  providers: [
    ContentService,
    {provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'}
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeedRoutingModule,
    ProfileModule,
    ClickOutsideModule
  ],
})
export class FeedModule {
}
