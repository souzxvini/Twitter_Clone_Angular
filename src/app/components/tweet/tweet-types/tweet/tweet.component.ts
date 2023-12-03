import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { showTweetTime } from 'src/app/helpers/show-tweet-time';
import { TweetModel } from 'src/app/models/tweet-model';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrl: './tweet.component.scss'
})
export class TweetComponent {
  @Input() tweet: TweetModel;

  setProfilePhoto = setProfilePhoto;
  showTweetTime = showTweetTime;
  
  constructor(
    private router: Router
  ){}

  redirectToProfile(username){
    this.router.navigate(['profile', username])
  }

  transformByteToImage(imageBytes){
    const base64Data = imageBytes; // Assuming this is your byte array encoded in Base64
    const imageSrc = 'data:image/jpeg;base64,' + base64Data;
    return imageSrc;
  }
 
}
