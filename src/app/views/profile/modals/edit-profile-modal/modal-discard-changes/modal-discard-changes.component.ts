import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-discard-changes',
  templateUrl: './modal-discard-changes.component.html',
  styleUrls: ['./modal-discard-changes.component.scss']
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
