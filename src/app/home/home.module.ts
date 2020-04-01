import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { ArticleShortcutComponent } from './article-shortcut/article-shortcut.component';
import { SharedModule } from '../shared/shared.module';
import { ContentService } from './content.service';
import { NewArticleComponent } from './new-article/new-article.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomePageComponent, ArticleShortcutComponent, NewArticleComponent],
  providers: [
    ContentService,
    {provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'}
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    EditorModule,
    FormsModule
  ],
})
export class HomeModule {
}
