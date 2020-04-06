import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { AuthGuardService } from './services/auth-guard.service';


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
    loadChildren: () => import('./profile/profile-routing.module').then(m => m.ProfileRoutingModule),
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule {
}
