import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'new-article',
    canActivate: [AuthGuardService],
    component: NewArticleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
