import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./feed/feed.module').then(mod => mod.FeedModule),
  },
  {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then(mod => mod.AccountsModule),
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
