import { Component } from '@angular/core';

@Component({
  selector: 'app-blocked-button-32px',
  templateUrl: './blocked-button-32px.component.html',
  styleUrls: ['./blocked-button-32px.component.scss']
})
export class BlockedButton32pxComponent {

  isHovered = false;
  buttonText = 'Bloqueado';

  constructor(){}

  blockedButonOnHover(hovered: boolean) {
    this.isHovered = hovered;
    this.buttonText = hovered ? 'Desbloquear' : 'Bloqueado';
  }
}
