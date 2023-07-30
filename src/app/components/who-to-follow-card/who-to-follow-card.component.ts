import { Component } from '@angular/core';

@Component({
  selector: 'app-who-to-follow-card',
  templateUrl: './who-to-follow-card.component.html',
  styleUrls: ['./who-to-follow-card.component.scss']
})
export class WhoToFollowCardComponent {

  isHovered = false;
  buttonText = 'Following';

  constructor(){

  }

  followingButonOnHover(hovered: boolean) {
    this.isHovered = hovered;
    this.buttonText = hovered ? 'Unfollow' : 'Following';
  }
}
