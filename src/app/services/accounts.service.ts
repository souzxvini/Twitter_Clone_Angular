import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

const API = environment.API

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  // USER-REGISTER-CONTROLLER

  //GET /v1/user/register/sendcode
  sendConfirmationCode(email) {
    let params: HttpParams = new HttpParams();
    params = params.append('email', email);

    return this.http.get(API + '/accounts/v1/user/register/sendcode', { params });
  }

  //GET /v1/user/register/confirmCode
  confirmCode(payload) {
    let params: HttpParams = new HttpParams();
    params = params.append('email', payload.email);
    params = params.append('code', payload.code);

    return this.http.get(API + '/accounts/v1/user/register/confirmcode', { params });
  }

  registerUser(payload) {
    const body = JSON.stringify(payload);

    return this.http.post(API + '/accounts/v1/user/register', body, this.httpOptions);
  }

  //USER-INFOS-CONTROLLER

  //PATCH /v1/user/infos/firstAccess
  updateFirstAcess() {
    return this.http.patch(API + '/accounts/v1/user/infos/firstaccess', this.httpOptions).pipe(map((resp) => {
      sessionStorage.setItem('firstAccess', 'false');
      return resp;
    }));
  }

  //PATCH /v1/user/infos/firstAccess
  updateUsername(username) {
    const body = {
      username: username
    }
    return this.http.patch(API + '/accounts/v1/user/infos/username', body , this.httpOptions);
  }

  patchProfileInformations(form){
    const body = {
      firstName: form.firstName,
      biography: form.biography,
      location: form.location,
      site: form.site,
      lastName: ' ',
    }

    return this.http.put(API + '/accounts/v1/user/infos', body , this.httpOptions);
  }

  //PATCH /v1/user/infos/firstAccess
  updateProfilePhoto(file, xPosition: number, yPosition: number) {
    xPosition = Math.trunc(xPosition);
    yPosition = Math.trunc(yPosition);

    var fd = new FormData();
    fd.append('profilePhoto', file);

    return this.http.patch(API + '/accounts/v1/user/infos/profilephoto/' + xPosition + '/' + yPosition, fd);
  }

  //USER-SEARCH-CONTROLLER

  //GET /v1/user/search/verified
  getVerifiedUsers(): Observable<any[]> {
    return this.http.get<any[]>(API + '/accounts/v1/user/search/verified');
  }

  //GET /v1/user/search/isvalidemail
  isValidEmail(email: string): Observable<any>{
    let params: HttpParams = new HttpParams();
    params = params.append('email', email);

    return this.http.get<any>(API + '/accounts/v1/user/search/isvalidemail', { params });
  }

   //GET /v1/user/search/isvaliduser
  verifyIfUsernameExists(username: string): Observable<any>{
    let params: HttpParams = new HttpParams();
    params = params.append('username', username);

    return this.http.get<any>(API + '/accounts/v1/user/search/isvaliduser', { params });
  }

   //GET /v1/user/search
   getLoggedUserAccount(): Observable<any>{
    return this.http.get<any>(API + '/accounts/v1/user/search');
  }

  //USER-INTERACTIONS-CONTROLLER

  //PATCH /v1/user/interactions/followtoggle/{identifier}
  followUser(identificador: string) {
    return this.http.patch(API + '/accounts/v1/user/interactions/followtoggle/' + identificador , this.httpOptions);
  }

}
