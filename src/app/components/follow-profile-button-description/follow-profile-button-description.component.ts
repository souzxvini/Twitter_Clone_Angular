import { Component, Input } from '@angular/core';
import { noProfilePicture } from 'src/app/helpers/no-profile-picture';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { UnfollowConfirmationModalComponent } from '../unfollow-confirmation-modal/unfollow-confirmation-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateAccountModalComponent } from 'src/app/views/initial-page/create-account-modal/create-account-modal.component';
import { AccountsService } from 'src/app/services/accounts.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-follow-profile-button-description',
  templateUrl: './follow-profile-button-description.component.html',
  styleUrls: ['./follow-profile-button-description.component.scss']
})
export class FollowProfileButtonDescriptionComponent {
  @Input() profile: any;
  @Input() suggestedProfiles: any;

  noProfilePicture = noProfilePicture;
  setProfilePhoto = setProfilePhoto;

  loaded = false;

  constructor(
    public dialogRef: MatDialogRef<CreateAccountModalComponent>,
    private dialog: MatDialog,
    private accountsService: AccountsService,
    private snackbar: MatSnackBar
  ){}

  followUser(username) {
    this.accountsService.followUser(username).subscribe({
      complete: () => {
        let profile = this.suggestedProfiles.find(profile => profile.username === username);
        profile.isFollowedByMe = !profile.isFollowedByMe;
      },
      error: () => {
        this.loaded = true;
        this.snackbar.open(
          'Desculpe, houve algum erro. Por favor, tente novamente.',
          '',
          { duration: 5000, panelClass: ['snackbarLoginError'] }
        );
      }
    })
  }

  openUnfollowConfirmationModal(profile) {
    const dialogRef = this.dialog.open(UnfollowConfirmationModalComponent, {
      width: '320px',
      panelClass: 'bordered-dialog',
      backdropClass: 'modalStyleBackdrop',
      disableClose: false,
      autoFocus: false,
      data: profile
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.followUser(profile.username);
        }
      }
    })
  }
}
