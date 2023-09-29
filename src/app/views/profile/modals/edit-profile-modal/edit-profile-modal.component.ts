import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { convertBytesToURL } from 'src/app/helpers/convert-bytes-to-url';
import { noProfilePicture } from 'src/app/helpers/no-profile-picture';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent {

  editProfileForm = new FormGroup<{
    backgroundImage: FormControl<any>,
    profilePicture: FormControl<string>, 
    firstName: FormControl<any>, 
    biography: FormControl<any>, 
    location: FormControl<any>,
    site: FormControl<any>
  }>({
    backgroundImage: new FormControl(null),
    profilePicture: new FormControl(null),
    firstName: new FormControl(null),
    biography: new FormControl(null),
    location: new FormControl(null),
    site: new FormControl(null)
  });

  noProfilePicture = noProfilePicture;
  convertBytesToURL = convertBytesToURL;
  setProfilePhoto = setProfilePhoto;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditProfileModalComponent>
  ){}

  ngOnInit(){
    
  }

}
