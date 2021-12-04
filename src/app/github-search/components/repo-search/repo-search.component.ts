import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GithubSearchService } from 'src/app/github-search/github-search.service';
import {Repo, UserModel} from 'src/app/github-search/models'

@Component({
  selector: 'app-repo-search',
  templateUrl: './repo-search.component.html',
  styleUrls: ['./repo-search.component.css']
})
export class RepoSearchComponent implements OnInit {
  lastTime: string;
  lastDate:string;
  rForm: FormGroup;
  minKeywordLength = 3;
  loading:boolean;
  repoList:Array<Repo>;
  user: UserModel;

  translations = {
    WelcomeText : "Welcome to GitHub repositories search page   "
    , LastVisit: " LastVisit "
    , SearchText: "Enter search key word"
    , NoDataMessage:  "No books by this keyword"
    // , ErrorMessageRequares: "This field is mandatory"
    // , ErrorMessageRowsMax: `Number of rows must be less or equal ${this.maxRows}`
  }
  constructor(private datePipe: DatePipe
    , private fb: FormBuilder
    , private router: Router
    , private githubSearchService:GithubSearchService
    )
    {
      this.user = githubSearchService.getCurrentUser();
      if (!this.user){
        this.router.navigate([`githubsearch`]);
      }

    }

  ngOnInit(): void {
    const now = Date();
    this.lastDate = this.datePipe.transform(now, 'dd/MM/yyyy');
    this.lastTime = this.datePipe.transform(now, 'shortTime');
    this.rForm = this.fb.group({
    'searchKeyword' : [null, [Validators.required, Validators.min(this.minKeywordLength)]],


  });
  }
  getRepos(){
    console.log("getRepos");
    if (this.rForm.valid){
      this.loading = true;
      this.getDataFromApi();
    }
  }
getDataFromApi(){
  const searchKeyword = this.rForm.get('searchKeyword').value;

  this.githubSearchService.getRepos( searchKeyword)
  .subscribe(
    data => {
        this.loading = false;
        if(!data) {
          //TODO
          return;
        }
        this.repoList = data["items"];
        console.log("repoList", this.repoList);
        // this.filteredData();
    },
    error => {
      //TODO
  });
}


}
