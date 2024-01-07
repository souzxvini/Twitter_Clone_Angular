import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-block-user',
  templateUrl: './modal-block-user.component.html',
  styleUrls: ['./modal-block-user.component.scss'],
  animations: [
    trigger('fastFadeInOutAnimation', [
      transition(':enter', [
        animate('200ms', keyframes([
          style({ opacity: 0 }),
          style({ opacity: 1 }),
        ]))
      ])
    ]),
    trigger('zoomIn', [
      transition(':enter', [
        style({ transform: 'scale(0.5)' }),
        animate('{{time}} cubic-bezier(0,.87,.61,.98)', style({ transform: 'scale(1)' })),
      ], { params: { time: '400ms' } }),
    ]),
  ]
})
export class ModalBlockUserComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private matDialogRef: MatDialogRef<ModalBlockUserComponent>
  ){}

  confirmBlockUser(){
    this.matDialogRef.close(true);
  }

}
