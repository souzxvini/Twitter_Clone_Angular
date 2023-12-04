import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TweetModel } from 'src/app/models/tweet-model';
import { showTweetTime } from 'src/app/helpers/show-tweet-time';

@Component({
  selector: 'app-tweet-header',
  templateUrl: './tweet-header.component.html',
  styleUrl: './tweet-header.component.scss'
})
export class TweetHeaderComponent {
  @Input() tweet: TweetModel;

  showTweetTime = showTweetTime;

  constructor(
    private router: Router
  ){}

  redirectToProfile(username){
    this.router.navigate(['profile', username])
  }
}
