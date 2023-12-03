import { Component, Input } from '@angular/core';
import { TweetModel } from 'src/app/models/tweet-model';

@Component({
  selector: 'app-tweet-message',
  templateUrl: './tweet-message.component.html',
  styleUrl: './tweet-message.component.scss'
})
export class TweetMessageComponent {
  @Input() tweet: TweetModel;

  constructor(){}

  transformByteToImage(imageBytes){
    const base64Data = imageBytes; // Assuming this is your byte array encoded in Base64
    const imageSrc = 'data:image/jpeg;base64,' + base64Data;
    return imageSrc;
  }
}
