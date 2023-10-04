import { Component } from '@angular/core';

@Component({
  selector: 'app-following-button-36px',
  templateUrl: './following-button-36px.component.html',
  styleUrls: ['./following-button-36px.component.scss']
})
export class FollowingButton36pxComponent {

  isHovered = false;
  buttonText = 'Seguindo';

  constructor(){}

  followingButonOnHover(hovered: boolean) {
    this.isHovered = hovered;
    this.buttonText = hovered ? 'Deixar de seguir' : 'Seguindo';
  }
}
