import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-block-user',
  templateUrl: './modal-block-user.component.html',
  styleUrls: ['./modal-block-user.component.scss']
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
