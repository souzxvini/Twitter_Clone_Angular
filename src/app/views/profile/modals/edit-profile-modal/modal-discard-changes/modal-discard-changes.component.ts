import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-discard-changes',
  templateUrl: './modal-discard-changes.component.html',
  styleUrls: ['./modal-discard-changes.component.scss'],
  animations: [
    trigger('fastFadeInOutAnimation', [
      transition(':enter', [
        animate('200ms', keyframes([
          style({ opacity: 0 }),
          style({ opacity: 1 }),
        ]))
      ])
    ]),
    trigger('fadeInOutAnimation', [
      transition(':enter', [
        animate('400ms cubic-bezier(.53,.02,1,.73)', keyframes([
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
export class ModalDiscardChangesComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private matDialogRef: MatDialogRef<ModalDiscardChangesComponent>
  ){}

  confirmDiscardChanges(){
    this.matDialogRef.close(true);
  }

}
