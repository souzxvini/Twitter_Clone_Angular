import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unfollow-confirmation-modal',
  templateUrl: './unfollow-confirmation-modal.component.html',
  styleUrls: ['./unfollow-confirmation-modal.component.scss']
})
export class UnfollowConfirmationModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private matDialogRef: MatDialogRef<UnfollowConfirmationModalComponent>
  ){}

  confirmUnfollow(){
    this.matDialogRef.close(true);
  }

}
