import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { TweetModel } from 'src/app/models/tweet-model';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrl: './tweet.component.scss'
})
export class TweetComponent {
  @Input() tweet: TweetModel;

  setProfilePhoto = setProfilePhoto;
  
  constructor(
    private feedService: FeedService,
    private router: Router, 
    private sanitizer: DomSanitizer
  ){}

  redirectToProfile(username){
    this.router.navigate(['profile', username])
  }

  likeToggle(tweetIdentifier){
    this.tweet.likedByMe = !this.tweet.likedByMe;
    this.tweet.likedByMe ? this.tweet.tweetLikesCount++ : this.tweet.tweetLikesCount--;
    
    this.feedService.likeToggle(tweetIdentifier).subscribe({
      error: () => {
        this.tweet.likedByMe = !this.tweet.likedByMe;
        this.tweet.likedByMe ? this.tweet.tweetLikesCount++ : this.tweet.tweetLikesCount--;
      }
    })
  }

  retweetToggle(tweetIdentifier){
    this.tweet.retweetedByMe = !this.tweet.retweetedByMe;
    this.tweet.retweetedByMe ? this.tweet.tweetRetweetsCount++ : this.tweet.tweetRetweetsCount--;
    
    this.feedService.retweetToggle(tweetIdentifier).subscribe({
      error: () => {
        this.tweet.retweetedByMe = !this.tweet.retweetedByMe;
        this.tweet.retweetedByMe ? this.tweet.tweetRetweetsCount++ : this.tweet.tweetRetweetsCount--;
      }
    })
  }

  favToggle(tweetIdentifier){
    /*this.tweet.retweetedByMe = !this.tweet.retweetedByMe;
    this.tweet.retweetedByMe ? this.tweet.tweetRetweetsCount++ : this.tweet.tweetRetweetsCount--;
    
    this.feedService.favToggle(tweetIdentifier).subscribe({
      error: () => {
        this.tweet.retweetedByMe = !this.tweet.retweetedByMe;
        this.tweet.retweetedByMe ? this.tweet.tweetRetweetsCount++ : this.tweet.tweetRetweetsCount--;
      }
    })*/
  }

  transformByteToImage(imageBytes){
    const base64Data = imageBytes; // Assuming this is your byte array encoded in Base64
    const imageSrc = 'data:image/jpeg;base64,' + base64Data;
    return imageSrc;
  }
}
