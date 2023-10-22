import { Component } from '@angular/core';

@Component({
  selector: 'app-blocked-button-36px',
  templateUrl: './blocked-button-36px.component.html',
  styleUrls: ['./blocked-button-36px.component.scss']
})
export class BlockedButton36pxComponent {

  isHovered = false;
  buttonText = 'Bloqueado';

  constructor(){}

  blockedButonOnHover(hovered: boolean) {
    this.isHovered = hovered;
    this.buttonText = hovered ? 'Desbloquear' : 'Bloqueado';
  }
}
