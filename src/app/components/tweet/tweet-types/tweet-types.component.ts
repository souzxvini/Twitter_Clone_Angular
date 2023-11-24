import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tweet-types',
  templateUrl: './tweet-types.component.html',
  styleUrl: './tweet-types.component.scss'
})
export class TweetTypesComponent {
  @Input() tweet: any;

  constructor(){}
}
