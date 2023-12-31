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
import { ModalDiscardChangesComponent } from './modal-discard-changes/modal-discard-changes.component';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
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
export class EditProfileModalComponent {

  @ViewChild('selectBackgroundFileButton') selectBackgroundFileButton!: ElementRef<HTMLInputElement>;
  @ViewChild('selectProfileFileButton') selectProfileFileButton!: ElementRef<HTMLInputElement>;

  editProfileForm = new FormGroup<{
    firstName: FormControl<any>,
    biography: FormControl<any>,
    location: FormControl<any>,
    site: FormControl<any>
  }>({
    firstName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    biography: new FormControl(null, Validators.maxLength(160)),
    location: new FormControl(null, Validators.maxLength(30)),
    site: new FormControl(null, Validators.maxLength(100))
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
  ) { }

  ngOnInit() {
    this.preencherForm();

    this.backgroundPhotoUrl = this.data.backgroundPhotoUrl;
    this.profilePhotoUrl = this.data.profilePhotoUrl;
  }

  preencherForm() {
    this.editProfileForm.controls['firstName'].setValue(this.data.firstName);
    this.editProfileForm.controls['biography'].setValue(this.data.biography);
    this.editProfileForm.controls['location'].setValue(this.data.location);
    this.editProfileForm.controls['site'].setValue(this.data.site);
  }

  patchProfileInformations() {
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

  closeModal() {
    if (this.editProfileForm.dirty ||
      this.backgroundPhotoUrl != this.data.backgroundPhotoUrl ||
      this.profilePhotoUrl != this.data.profilePhotoUrl) {
      const dialogRef = this.dialog.open(ModalDiscardChangesComponent, {
        width: '320px',
        panelClass: 'bordered-dialog',
        backdropClass: 'modalStyleBackdrop',
        disableClose: false,
        autoFocus: false
      });
  
      dialogRef.afterClosed().subscribe({
        next: (res) => {
          if (res) {
            this.dialogRef.close();
          }
        }
      })
    } else {
      this.dialogRef.close();
    }
  }
}
