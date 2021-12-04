import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CryptocurrencyService {

  constructor(private http: HttpClient) { }

  getCurrencyData(limit:number ): Observable<any>  {
    const res = `http://localhost:5000/GetCurrencyData/${limit}`;
     return this.http.get(res).pipe(map(data => {
      return  data["data"];
    }),
      catchError(err => {
        console.log("err: ", err);
        return throwError(err);
      }))
  };
}
