import { Component, Input } from '@angular/core';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { showTweetTime } from 'src/app/helpers/show-tweet-time';
import { TweetModel } from 'src/app/models/tweet-model';

@Component({
  selector: 'app-original-tweet',
  templateUrl: './original-tweet.component.html',
  styleUrl: './original-tweet.component.scss'
})
export class OriginalTweetComponent {
  @Input() originalTweet: TweetModel;
  @Input() retweetHasFile: boolean;

  setProfilePhoto = setProfilePhoto;
  showTweetTime = showTweetTime;

  constructor(){

  }

  transformByteToImage(imageBytes){
    const base64Data = imageBytes;
    const imageSrc = 'data:image/jpeg;base64,' + base64Data;
    return imageSrc;
  }
}
