import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [

 { path: '', pathMatch: 'full', redirectTo: 'githubsearch' },
 { path: 'githubsearch', loadChildren: () => import('./github-search/github-search.module').then(m => m.GithubSearchModule) },

];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
