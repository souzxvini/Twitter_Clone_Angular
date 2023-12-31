import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
    private router: Router,
    private cookieService: CookieService
  ) { }

  public authenticate(payload: any): Observable<any> {

    const body = JSON.stringify(payload)

    return this.http.post<any>(API + '/authentication/v1/connect', body, this.httpOptions).pipe(map((resp) => {
      sessionStorage.setItem('token', 'Bearer ' + resp.token);
      sessionStorage.setItem('userName', resp.username);
      sessionStorage.setItem('firstAccess', resp.firstAccess);
      return resp;
    }));
  }

  isUserSignedin() {
    return sessionStorage.getItem('token') !== null;
  }

  isUserFirstAcess() {
    return sessionStorage.getItem('firstAccess');
  }

  getAuthToken() {
    return sessionStorage.getItem('token');
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('firstAccess');

    this.router.navigate(['initial-page']);
  }

}
