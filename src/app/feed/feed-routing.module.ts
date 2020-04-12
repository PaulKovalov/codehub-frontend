import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { MyArticlesComponent } from './profile/my-articles/my-articles.component';
import { NewArticleComponent } from './profile/new-article/new-article.component';
import { ArticleEditorGuardService } from './services/article-editor-guard.service';
import { NewTutorialComponent } from './profile/new-tutorial/new-tutorial.component';
import { MyTutorialsComponent } from './profile/my-tutorials/my-tutorials.component';
import { TutorialsListComponent } from './tutorials-list/tutorials-list.component';


const routes: Routes = [
  {
    path: '',
    component: FeedComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: RecentActivityComponent,
      },
      {
        path: 'articles',
        component: ArticlesListComponent,
      },
      {
        path: 'articles/:id',
        component: ArticleViewComponent,
      },
      {
        path: 'tutorials',
        component: TutorialsListComponent,
      },
      {
        path: 'profile',
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'my-articles'
          },
          {
            path: 'my-articles',
            component: MyArticlesComponent,
          },
          {
            path: 'compose-article',
            component: NewArticleComponent,
            data: {mode: 'create'}
          },
          {
            path: 'edit-article/:id',
            component: NewArticleComponent,
            canActivate: [ArticleEditorGuardService],
            data: {mode: 'edit'}
          },
          {
            path: 'my-tutorials',
            component: MyTutorialsComponent,
          },
          {
            path: 'compose-tutorial',
            component: NewTutorialComponent,
            data: {mode: 'create'}
          }
        ]
      },
    ]
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule {
}
