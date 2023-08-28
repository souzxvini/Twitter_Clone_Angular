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

  public authenticate(payload: any): Observable<any>{
    return this.http.post<any>(API + '/authentication/v1/connect', payload, this.httpOptions).pipe(map((resp) => {
			sessionStorage.setItem('token', 'Bearer ' + resp.token);
			sessionStorage.setItem('userName', resp.username);
			return resp;
    }));
  }

  isUserSignedin() {
		return sessionStorage.getItem('token') !== null;
	}

}
