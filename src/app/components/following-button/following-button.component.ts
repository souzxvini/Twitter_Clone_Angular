import { Component } from '@angular/core';

@Component({
  selector: 'app-following-button',
  templateUrl: './following-button.component.html',
  styleUrls: ['./following-button.component.scss']
})
export class FollowingButtonComponent {

  isHovered = false;
  buttonText = 'Following';

  constructor(){}

  followingButonOnHover(hovered: boolean) {
    this.isHovered = hovered;
    this.buttonText = hovered ? 'Unfollow' : 'Following';
  }
}
