import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewArticleComponent } from './new-article/new-article.component';
import { ArticlesListComponent } from '../articles-list/articles-list.component';


const routes: Routes = [
  {
    path: 'new-article',
    component: NewArticleComponent,
  },
  {
    path: 'my-articles',
    component: ArticlesListComponent,
    data: {mode: 'my-articles'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
