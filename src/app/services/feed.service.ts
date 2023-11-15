import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = environment.API

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  //Explore controller

  //GET {type}
  searchByText(type, keyword, page, size): Observable<any[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('keyword', keyword);
    params = params.append('page', page);
    params = params.append('size', size);

    return this.http.get<any[]>(API + '/feed/v1/explorer/' + type, { params } );
  }
}
