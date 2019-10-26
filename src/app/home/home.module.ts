import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomePageComponent} from './home-page/home-page.component';
import {ArticleShortcutComponent} from './article-shortcut/article-shortcut.component';
import {SharedModule} from '../shared/shared.module';
import {ApiService} from './api.service';

@NgModule({
  declarations: [HomePageComponent, ArticleShortcutComponent],
  providers: [
    ApiService
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule {
}
