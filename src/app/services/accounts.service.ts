import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AnotherProfileModel } from '../models/another-profile-model';

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
      localStorage.setItem('firstAccess', 'false');
      return resp;
    }));
  }

  //PATCH /v1/user/infos/firstAccess
  updateUsername(username) {
    const body = {
      username: username
    }
    return this.http.patch(API + '/accounts/v1/user/infos/username', body, this.httpOptions);
  }

  patchProfileInformations(payload) {

    const body = JSON.stringify(payload);

    return this.http.put(API + '/accounts/v1/user/infos', body, this.httpOptions);
  }

  //PATCH /v1/user/infos/firstAccess
  updateProfilePhoto(imageUrl) {
    const body = {
      imageUrl: imageUrl
    }

    return this.http.patch(API + '/accounts/v1/user/infos/profilephoto', body, this.httpOptions);
  }

  //USER-SEARCH-CONTROLLER

  //GET /v1/user/search/verified
  getVerifiedUsers(): Observable<any[]> {
    return this.http.get<any[]>(API + '/accounts/v1/user/search/verified');
  }

  //GET /v1/user/search/isvalidemail
  isValidEmail(email: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('email', email);

    return this.http.get<any>(API + '/accounts/v1/user/search/isvalidemail', { params });
  }

  //GET /v1/user/search/isvaliduser
  verifyIfUsernameExists(username: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('username', username);

    return this.http.get<any>(API + '/accounts/v1/user/search/isvaliduser', { params });
  }

  //GET /v1/user/search
  getLoggedUserAccount(): Observable<any> {
    return this.http.get<any>(API + '/accounts/v1/user/search');
  }

  //GET /v1/user/search/byidentifier/{identifier}
  getUserByIdentifier(username): Observable<any> {
    return this.http.get<any>(API + '/accounts/v1/user/search/byidentifier/' + username);
  }

  //GET /v1/user/search/whotofollow
  getWhoToFollowAccounts(page, size, username, isCreatorOnly?): Observable<AnotherProfileModel[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    username ? params = params.append('userOnScreen', username) : null;
    isCreatorOnly ? params = params.append('isVerified', isCreatorOnly) : null;

    return this.http.get<AnotherProfileModel[]>(API + '/accounts/v1/user/search/whotofollow', { params });
  }

  //GET /v1/user/search/followsdetails/{identifier}/{type}
  getUserFollowsDetails(username, type, page, size): Observable<any[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    return this.http.get<any[]>(API + '/accounts/v1/user/search/followsdetails/' + username + '/' + type, { params });
  }

  //GET /v1/user/search/commonFollows
  getCommonFollows(username): Observable<any[]> {
    return this.http.get<any[]>(API + '/accounts/v1/user/search/allknownfollowers/' + username);
  }

  getProfilesByUsername(username, page, size): Observable<any[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    params = params.append('username', username);
    return this.http.get<any[]>(API + '/accounts/v1/user/search/byusername', { params });
  }

  getSearchHistoric(): Observable<any[]> {
    return this.http.get<any[]>(API + '/accounts/v1/user/search/historic');
  }

  postSearchHistoric(payload){
    const body = JSON.stringify(payload);

    return this.http.post(API + '/accounts/v1/user/search/historic', body, this.httpOptions);
  }

  clearHistoric(){
    return this.http.delete(API + '/accounts/v1/user/search/historic/all', this.httpOptions);
  }

  deleteFromHistoric(identifier?){
    return this.http.delete(API + '/accounts/v1/user/search/historic/' + identifier, this.httpOptions);
  }

  //USER-INTERACTIONS-CONTROLLER

  //PATCH /v1/user/interactions/followtoggle/{identifier}
  followUser(username: string) {
    return this.http.patch(API + '/accounts/v1/user/interactions/followtoggle/' + username, this.httpOptions);
  }

  userNotificationsToggle(username: string) {
    return this.http.patch(API + '/accounts/v1/user/interactions/alerttoggle/' + username, this.httpOptions);
  }

  blockToggle(username: string) {
    return this.http.patch(API + '/accounts/v1/user/interactions/blocktoggle/' + username, this.httpOptions);
  }

  
}
