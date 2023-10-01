import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { convertBytesToURL } from 'src/app/helpers/convert-bytes-to-url';
import { noProfilePicture } from 'src/app/helpers/no-profile-picture';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { MyProfileModel } from 'src/app/models/my-profile-model';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent {
  
  editProfileForm = new FormGroup<{
    firstName: FormControl<any>, 
    lastName: FormControl<any>, 
    biography: FormControl<any>, 
    location: FormControl<any>,
    site: FormControl<any>
  }>({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    biography: new FormControl(null),
    location: new FormControl(null),
    site: new FormControl(null)
  });

  noProfilePicture = noProfilePicture;
  convertBytesToURL = convertBytesToURL;
  setProfilePhoto = setProfilePhoto;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MyProfileModel,
    private dialogRef: MatDialogRef<EditProfileModalComponent>,
    private accountsService: AccountsService,
    private snackbar: MatSnackBar
  ){}

  ngOnInit(){
    this.preencherForm();
  }

  preencherForm(){
    console.log(this.data)
    this.editProfileForm.controls['firstName'].setValue(this.data.firstName);
    this.editProfileForm.controls['lastName'].setValue('teste');
    this.editProfileForm.controls['biography'].setValue(this.data.biography);
    this.editProfileForm.controls['location'].setValue(this.data.location);
    this.editProfileForm.controls['site'].setValue(this.data.site);
  }

  patchProfileInformations(){
    this.accountsService.patchProfileInformations(this.editProfileForm.value).subscribe({
      complete: () => {
        this.dialogRef.close(true);
      }, 
      error: () => {
        this.snackbar.open(
          'Desculpe, ocorreu um erro ao atualizar o seu perfil.',
          '',
          { duration: 5000, panelClass: ['snackbarLoginError'] }
        );
      }
    })
  }

}
