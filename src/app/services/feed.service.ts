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

  //Posts Controller

  //v1/posts/newtweet
  newTweet(payload) {
    const formData: FormData = new FormData();
    formData.append('message', payload.message);
   
    formData.append('canBeReplied', payload.canBeReplied);

    return this.http.post(API + '/feed/v1/posts/newtweet', formData);
  }

  //v1/posts/liketoggle/{tweet}
  likeToggle(tweetIdentifier) {
    return this.http.post(API + '/feed/v1/posts/liketoggle/' + tweetIdentifier, this.httpOptions);
  }

  //v1/posts/retweetToggle/{tweet}
  retweetToggle(tweetIdentifier) {
    return this.http.post(API + '/feed/v1/posts/retweettoggle/' + tweetIdentifier, this.httpOptions);
  }
}
