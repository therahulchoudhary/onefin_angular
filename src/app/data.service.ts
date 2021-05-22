import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface UserData {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseURL: string = "https://demo.credy.in/api/v1";
  userData: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 
    })
  };

  constructor(private httpClient: HttpClient) {
    this.userData = JSON.parse(localStorage.getItem('userData') || '');
  }

  login(data: UserData, uri: string): Observable<any> {
    return this.httpClient.post<any>(this.baseURL + uri, data, this.httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  getMovies(uri: string): Observable<any> {
    console.log(this.userData)
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Token ' + this.userData.token
      })
    }
    console.log(this.httpOptions);
    return this.httpClient.get<any>(this.baseURL + uri, this.httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    )
  }
}
