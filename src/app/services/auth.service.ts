import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = environment.API

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public authenticate(payload: any): Observable<any> {

    const body = JSON.stringify(payload)

    return this.http.post<any>(API + '/authentication/v1/connect', body, this.httpOptions).pipe(map((resp) => {
      localStorage.setItem('token', 'Bearer ' + resp.token);
      localStorage.setItem('userName', resp.username);
      localStorage.setItem('firstAccess', resp.firstAccess);
      return resp;
    }));
  }

  isUserSignedin() {
    return localStorage.getItem('token') !== null;
  }

  isUserFirstAcess() {
    return localStorage.getItem('firstAccess');
  }

  getAuthToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('firstAccess');

    this.router.navigate(['initial-page']);
  }

}
