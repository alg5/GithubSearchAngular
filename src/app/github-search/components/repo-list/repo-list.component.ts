import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GithubSearchService } from 'src/app/github-search/github-search.service';
import {Owner, Repo} from 'src/app/github-search/models'
@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css']
})
export class RepoListComponent implements OnInit {

  loading:boolean;
  @Input() repoList:Array<Repo>;

  translations = {

     NoDataMessage:  "No books by this keyword"
  }
  constructor(private datePipe: DatePipe
                , private fb: FormBuilder
                , private githubSearchService:GithubSearchService
                ) { }

  ngOnInit(): void {

  }
  bookmark(repo: Repo){
    const owner :Owner = {avatar_url: repo.owner.avatar_url, login: repo.owner.login}
     const newRepo: Repo = {id: repo.id, name:repo.name, bookmarked:repo.bookmarked, owner:owner} ;
    //const newRepo: Repo = {id: repo.id, name:repo.name, bookmarked:repo.bookmarked} ;
    console.log("bookmarked", newRepo);
    this.handleRepoBookmarked(newRepo);

  }
  getTitle(repo: Repo){
    return repo.bookmarked ? "Remove from bookmarked" : "Add to bookmarked";
  }
  getBookMarkIcon(repo: Repo){
     return repo.bookmarked ? "bookmark" : "bookmark_border";
  }
  handleRepoBookmarked(repo: Repo){
    this.githubSearchService.handleRepoBookmarked(repo )
      .subscribe(
              data => {
                  console.log(" login data: ", data);
                  if(!data)
                  {
                    //TODO
                    return;
                  }
                  console.log(data);

               },
              error => {
                //TODO
                  // this.loading = false;
    });

  }

}
