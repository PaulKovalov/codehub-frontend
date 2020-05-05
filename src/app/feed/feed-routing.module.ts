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
import { NewTutorialComponent } from './profile/new-tutorial/new-tutorial.component';
import { MyTutorialsComponent } from './profile/my-tutorials/my-tutorials.component';
import { TutorialsListComponent } from './tutorials-list/tutorials-list.component';
import { TutorialViewComponent } from './tutorial-view/tutorial-view.component';
import { NewTutorialArticleComponent } from './profile/new-tutorial-article/new-tutorial-article.component';
import { TutorialArticleViewComponent } from './tutorial-article-view/tutorial-article-view.component';
import { MyTutorialGuardService } from './services/my-tutorial-guard.service';
import { MyArticleGuardService } from './services/my-article-guard.service';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './profile/settings/settings.component';


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
        path: 'tutorials/:tutorialId',
        component: TutorialViewComponent,
      },
      {
        path: 'tutorials/:tutorialId/articles/:articleId',
        component: TutorialArticleViewComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
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
            path: 'my-articles/:id',
            component: ArticleViewComponent,
            canActivate: [MyArticleGuardService],
            data: {mode: 'owner'}
          },
          {
            path: 'my-articles/:id/edit',
            component: NewArticleComponent,
            canActivate: [MyArticleGuardService],
            data: {mode: 'edit'}
          },
          {
            path: 'compose-article',
            component: NewArticleComponent,
            data: {mode: 'create'}
          },
          {
            path: 'my-tutorials',
            component: MyTutorialsComponent,
          },
          {
            path: 'my-tutorials/:tutorialId',
            canActivate: [MyTutorialGuardService],
            component: TutorialViewComponent,
            data: {mode: 'owner'}
          },
          {
            path: 'my-tutorials/:tutorialId/new-article',
            canActivate: [MyTutorialGuardService],
            component: NewTutorialArticleComponent,
            data: {mode: 'create'}
          },
          {
            path: 'my-tutorials/:tutorialId/edit',
            canActivate: [MyTutorialGuardService],
            component: NewTutorialComponent,
            data: {mode: 'edit'}
          },
          {
            path: 'my-tutorials/:tutorialId/articles/:articleId',
            component: TutorialArticleViewComponent,
            data: {mode: 'owner'}
          },
          {
            path: 'my-tutorials/:tutorialId/articles/:articleId/edit',
            component: NewTutorialArticleComponent,
            data: {mode: 'edit'}
          },
          {
            path: 'compose-tutorial',
            component: NewTutorialComponent,
            data: {mode: 'create'}
          },
          {
            path: 'settings',
            component: SettingsComponent
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
