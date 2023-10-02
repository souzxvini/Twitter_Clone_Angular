import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { setBackgroundPhoto } from 'src/app/helpers/set-background-photo';

@Component({
  selector: 'app-full-screen-background-photo-modal',
  templateUrl: './full-screen-background-photo-modal.component.html',
  styleUrls: ['./full-screen-background-photo-modal.component.scss']
})
export class FullScreenBackgroundPhotoModalComponent {

  setBackgroundPhoto = setBackgroundPhoto;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FullScreenBackgroundPhotoModalComponent>
  ){
  }

}
