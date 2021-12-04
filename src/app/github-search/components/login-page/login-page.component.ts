import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LOCAL_STORAGE_KEY_TOKEN, LOCAL_STORAGE_KEY_USER, UserModel} from 'src/app/github-search/models'
import { GithubSearchService } from '../../github-search.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  lastTime: string;
  lastDate:string;
  username:string;
  userid: string;
  password:string;
  errorCode: number = 0;

  statuslogin:any;
  focusin: boolean = true;
  rForm: FormGroup;
  post:any;
  user: UserModel = null;

  translations = {
    WelcomeText : "Hello, guest"
    // , CustomerName : " אורח"
    , LastVisit: " Last Visit"
    , ErrorMessage: "User not found"

  }
  constructor(private datePipe: DatePipe
    , private fb: FormBuilder
    , private router: Router
    , private githubSearchService:GithubSearchService
)
  {
    this.user =  githubSearchService.getCurrentUser();
    if (this.user){
      // this.router.navigate([`githubsearch/repo-searh`]);
    }
  }

  ngOnInit(): void {
    const now = Date();
    this.lastDate = this.datePipe.transform(now, 'dd/MM/yyyy');
    this.lastTime = this.datePipe.transform(now, 'shortTime');
    this.rForm = this.fb.group({
      'login' : [null, [Validators.required,  Validators.maxLength(20)]],
      'password' : [null, [Validators.required,  Validators.maxLength(20)]],
    });
  }
  sendLogin()
  {
     this.user = { Login: this.rForm.get('login').value, Password: this.rForm.get('password').value};

    // this.userid =  this.rForm.get('userid').value
    console.log("sendLogin", this.user);
    this.getLoginFromApi();

  }
  getLoginFromApi(){
    this.githubSearchService.login(this.user )
      .subscribe(
              data => {
                  console.log(" login data: ", data);
                  if(!data)
                  {
                    this.errorCode = -1; //TODO
                    return;
                  }
                  if(data &&  data.ErrorCode < 0) {
                  //  this.errorMessage =  this.translations.ErrorMessage;
                    return;
                  }
                  this.errorCode = data['ErrorCode'];
                  if (!this.errorCode || this.errorCode == 0)
                  {
                    const user : UserModel = data['Login'];
                    const token:string = data['Token'];
                    localStorage.setItem (LOCAL_STORAGE_KEY_USER, JSON.stringify(user));
                    if (token)
                      localStorage.setItem (LOCAL_STORAGE_KEY_TOKEN, JSON.stringify(token));
                    this.router.navigate([`githubsearch/repo-searh`]);
                  }
                  else{
                    localStorage.removeItem (LOCAL_STORAGE_KEY_USER);
                    localStorage.removeItem (LOCAL_STORAGE_KEY_TOKEN);
                  }

               },
              error => {
                console.log(" error123: ", error);
                if (error.statusCode = 404)
                {
                  localStorage.removeItem (LOCAL_STORAGE_KEY_USER);
                  localStorage.removeItem (LOCAL_STORAGE_KEY_TOKEN);
                  this.errorCode = -1; //TODO
                }

    });

  }

}
