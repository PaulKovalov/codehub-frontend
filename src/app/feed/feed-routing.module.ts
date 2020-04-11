import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NotFoundComponent } from '../shared/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: FeedComponent,
    children: [
      {
        path: 'articles',
        component: ArticlesListComponent,
      },
      {
        path: 'articles/:id',
        component: ArticleViewComponent,
      },
    ]
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
        component: ArticlesListComponent,
      }
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
