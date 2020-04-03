import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { ArticlesListComponent } from './home-page/articles-list/articles-list.component';
import { ArticleViewComponent } from './home-page/article-view/article-view.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: ArticlesListComponent,
      },
    ]
  },
  {
    path: 'new-article',
    canActivate: [AuthGuardService],
    component: NewArticleComponent,
  },
  {
    path: 'article/:id',
    component: ArticleViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
