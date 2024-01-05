import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { TweetModel } from 'src/app/models/tweet-model';

@Component({
  selector: 'app-retweet',
  templateUrl: './retweet.component.html',
  styleUrl: './retweet.component.scss'
})
export class RetweetComponent {
  @Input() tweet: TweetModel;

  setProfilePhoto = setProfilePhoto;

  constructor(
    private router: Router
  ){

  }

  redirectToProfile(username){
    this.router.navigate(['profile', username])
  }
}
