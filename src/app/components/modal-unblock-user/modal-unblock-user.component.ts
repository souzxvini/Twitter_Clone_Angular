import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-unblock-user',
  templateUrl: './modal-unblock-user.component.html',
  styleUrls: ['./modal-unblock-user.component.scss']
})
export class ModalUnblockUserComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private matDialogRef: MatDialogRef<ModalUnblockUserComponent>
  ){}

  confirmUnblockUser(){
    this.matDialogRef.close(true);
  }

}
