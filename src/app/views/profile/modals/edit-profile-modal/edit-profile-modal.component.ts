import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditBackgroundPictureModalComponent } from 'src/app/components/edit-background-picture-modal/edit-background-picture-modal.component';
import { EditProfilePictureModalComponent } from 'src/app/components/edit-profile-picture-modal/edit-profile-picture-modal.component';
import { noProfilePicture } from 'src/app/helpers/no-profile-picture';
import { setBackgroundPhoto } from 'src/app/helpers/set-background-photo';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { MyProfileModel } from 'src/app/models/my-profile-model';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent {

  @ViewChild('selectBackgroundFileButton') selectBackgroundFileButton!: ElementRef<HTMLInputElement>;
  @ViewChild('selectProfileFileButton') selectProfileFileButton!: ElementRef<HTMLInputElement>;
  
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

  loaded = true;

  noProfilePicture = noProfilePicture;
  setProfilePhoto = setProfilePhoto;
  setBackgroundPhoto = setBackgroundPhoto;

  backgroundPhotoUrl: string;
  profilePhotoUrl: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MyProfileModel,
    private dialogRef: MatDialogRef<EditProfileModalComponent>,
    private accountsService: AccountsService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ){}

  ngOnInit(){
    this.preencherForm();

    this.backgroundPhotoUrl = this.data.backgroundPhotoUrl;
    this.profilePhotoUrl = this.data.profilePhotoUrl;
  }

  preencherForm(){
    this.editProfileForm.controls['firstName'].setValue(this.data.firstName);
    this.editProfileForm.controls['lastName'].setValue('teste');
    this.editProfileForm.controls['biography'].setValue(this.data.biography);
    this.editProfileForm.controls['location'].setValue(this.data.location);
    this.editProfileForm.controls['site'].setValue(this.data.site);
  }

  patchProfileInformations(){
    this.loaded = false;
    const payload = {
      firstName: this.editProfileForm.controls['firstName'].value,
      biography: this.editProfileForm.controls['biography'].value,
      location: this.editProfileForm.controls['location'].value,
      site: this.editProfileForm.controls['site'].value,
      backgroundPhotoUrl: this.backgroundPhotoUrl,
      profilePhotoUrl: this.profilePhotoUrl
    }

    this.accountsService.patchProfileInformations(payload).subscribe({
      complete: () => {
        this.dialogRef.close(payload);
        this.loaded = true;
      }, 
      error: () => {
        this.loaded = true;
        this.snackbar.open(
          'Desculpe, ocorreu um erro ao atualizar o seu perfil.',
          '',
          { duration: 5000, panelClass: ['snackbarLoginError'] }
        );
      }
    })
  }

  openBackgroundFileInput() {
    this.selectBackgroundFileButton.nativeElement.click();
  }

  onSelectBackgroundFile(event: any): void {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        const dialogRef = this.dialog.open(EditBackgroundPictureModalComponent, {
          width: '100%',
          maxWidth: '100vw',
          maxHeight: '100vh',
          panelClass: 'modalStyle',
          backdropClass: 'transparentModalStyleBackdrop',
          disableClose: true,
          autoFocus: false,
          data: e.target.result
        });

        dialogRef.afterClosed().subscribe(imgUrl => {
          if (imgUrl) {
            this.backgroundPhotoUrl = imgUrl;
          }
        });

        this.breakpointObserver.observe(["(max-width: 700px)"])
          .subscribe((res) => {
            if (res.matches) {
              dialogRef.updateSize('100vw', '100vh');
              dialogRef.removePanelClass('bordered-dialog');
              dialogRef.addPanelClass('no-border-dialog');
            } else {
              dialogRef.updateSize('600px', '660px');
              dialogRef.addPanelClass('bordered-dialog');
              dialogRef.removePanelClass('no-border-dialog');
            }
          })

        this.selectBackgroundFileButton.nativeElement.value = ''
      }
    }
  }

  openProfileFileInput() {
    this.selectProfileFileButton.nativeElement.click();
  }

  onSelectProfileFile(event: any): void {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        const dialogRef = this.dialog.open(EditProfilePictureModalComponent, {
          width: '100%',
          maxWidth: '100vw',
          maxHeight: '100vh',
          panelClass: 'modalStyle',
          backdropClass: 'transparentModalStyleBackdrop',
          disableClose: true,
          autoFocus: false,
          data: e.target.result
        });

        dialogRef.afterClosed().subscribe(imgUrl => {
          if (imgUrl) {
            this.profilePhotoUrl = imgUrl;
          }
        });

        this.breakpointObserver.observe(["(max-width: 700px)"])
          .subscribe((res) => {
            if (res.matches) {
              dialogRef.updateSize('100vw', '100vh');
              dialogRef.removePanelClass('bordered-dialog');
              dialogRef.addPanelClass('no-border-dialog');
            } else {
              dialogRef.updateSize('600px', '660px');
              dialogRef.addPanelClass('bordered-dialog');
              dialogRef.removePanelClass('no-border-dialog');
            }
          })

        this.selectBackgroundFileButton.nativeElement.value = ''
      }
    }
  }

}
