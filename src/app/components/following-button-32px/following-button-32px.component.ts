import { Component } from '@angular/core';

@Component({
  selector: 'app-following-button-32px',
  templateUrl: './following-button-32px.component.html',
  styleUrls: ['./following-button-32px.component.scss']
})
export class FollowingButton32pxComponent {

  isHovered = false;
  buttonText = 'Seguindo';

  constructor(){}

  followingButonOnHover(hovered: boolean) {
    this.isHovered = hovered;
    this.buttonText = hovered ? 'Deixar de Seguir' : 'Seguindo';
  }
}
