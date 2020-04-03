import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { ContentService } from './content.service';
import { NewArticleComponent } from './new-article/new-article.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticlePreviewComponent } from './home-page/article-preview/article-preview.component';
import { ArticlesListComponent } from './home-page/articles-list/articles-list.component';
import { ArticleViewComponent } from './home-page/article-view/article-view.component';

@NgModule({
  declarations: [HomePageComponent, ArticlePreviewComponent, NewArticleComponent, ArticlesListComponent, ArticleViewComponent],
  providers: [
    ContentService,
    {provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'}
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {
}
