import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GithubSearchRoutingModule } from './github-search-routing.module';
import { RepoListComponent } from './components/repo-list/repo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RepoSearchComponent } from './components/repo-search/repo-search.component';
import { RepoBookmarkComponent } from './components/repo-bookmark/repo-bookmark.component';


@NgModule({
  declarations: [ RepoListComponent, LoginPageComponent, RepoSearchComponent, RepoBookmarkComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    GithubSearchRoutingModule
  ]
})
export class GithubSearchModule { }
