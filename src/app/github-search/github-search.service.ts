import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LOCAL_STORAGE_KEY_USER, Repo, UserModel } from './models';

@Injectable({
  providedIn: 'root'
})
export class GithubSearchService {

  constructor(private http: HttpClient) {

  }
  getRepos(keyword:string ): Observable<any>  {
    const res = `${environment.apiUrl}GetRepos/${keyword}`;

     return this.http.get(res).pipe(map(data => {
       console.log(data);
      return  data;
    }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };
  login(user: UserModel ): Observable<any>  {

    //debug
    // const users = this.loginLocal(idUser);

//    const url = `${environment.apiUrl}Login`;
    const url = `${environment.apiUrl}auth/login`;

    // let params = new HttpParams().set('idUser', idUser)
    return this.http.post(url, user).pipe(map(data => {

       console.log("login: ", data);

      return data;

    }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };
  getCurrentUser()
  {
    let user:UserModel;

    const obj = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
    if (obj)
    {
        user = JSON.parse(obj);;
    }
    return user;
  }
  handleRepoBookmarked(repo: Repo ): Observable<any>  {

    //debug
    // const users = this.loginLocal(idUser);
      console.log("handleRepoBookmarked: ", repo);
    const url = !repo.bookmarked ? `${environment.apiUrl}AddRepoToBookmarked` :`${environment.apiUrl}RemoveRepoFromBookmarked`;
    // const url = `${environment.apiUrl}AddRepoToBookmarked` ;
    // "http://localhost:5000/AddRepoToBookmarked" : "http://localhost:5000/RemoveRepoFromBookmarked";
    // let params = new HttpParams().set('idUser', idUser)
    return this.http.post(url, repo).pipe(map(data => {

      console.log("handleRepoBookmarked: ", data);

      return data;

    }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };
}
