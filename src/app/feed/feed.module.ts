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
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { ClickOutsideModule } from 'ng-click-outside';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { MyArticlesComponent } from './profile/my-articles/my-articles.component';
import { NavbarService } from './services/navbar.service';
import { ProfileNavbarService } from './services/profile-navbar.service';
import { NAVBAR_SERVICE_TOKEN, PROFILE_NAVBAR_SERVICE_TOKEN } from './services/injection-tokens';
import { NewArticleComponent } from './profile/new-article/new-article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './services/auth-guard.service';


@NgModule({
  declarations: [
    FeedComponent,
    NavbarComponent,
    ArticlePreviewComponent,
    ArticleViewComponent,
    ArticlesListComponent,
    RecentActivityComponent,
    MyArticlesComponent,
    NewArticleComponent,
  ],
  providers: [
    ContentService,
    AuthGuardService,
    {provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'},
    {provide: NAVBAR_SERVICE_TOKEN, useClass: NavbarService},
    {provide: PROFILE_NAVBAR_SERVICE_TOKEN, useClass: ProfileNavbarService}
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeedRoutingModule,
    ClickOutsideModule,
    ReactiveFormsModule,
    EditorModule,
    FormsModule
  ],
})
export class FeedModule {
}
