import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { noProfilePicture } from 'src/app/helpers/no-profile-picture';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';

@Component({
  selector: 'app-full-screen-profile-photo-modal',
  templateUrl: './full-screen-profile-photo-modal.component.html',
  styleUrls: ['./full-screen-profile-photo-modal.component.scss']
})
export class FullScreenProfilePhotoModalComponent {

  noProfilePicture = noProfilePicture;
  setProfilePhoto = setProfilePhoto;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FullScreenProfilePhotoModalComponent>
  ){
  }

}
