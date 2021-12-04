import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepoListComponent } from './components/repo-list/repo-list.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RepoSearchComponent } from './components/repo-search/repo-search.component';
import { RepoBookmarkComponent } from './components/repo-bookmark/repo-bookmark.component';
const routes: Routes = [
  // { path: '', component: RepoListComponent },
  { path: '', component: LoginPageComponent },
  { path: 'repo-searh', component: RepoSearchComponent },
  { path: 'repo-bookmark', component: RepoBookmarkComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GithubSearchRoutingModule { }
