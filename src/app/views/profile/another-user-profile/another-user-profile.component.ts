import { Component } from '@angular/core';
import { setBackgroundPhoto } from 'src/app/helpers/set-background-photo';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { AccountsService } from 'src/app/services/accounts.service';
import { FullScreenProfilePhotoModalComponent } from '../modals/full-screen-profile-photo-modal/full-screen-profile-photo-modal.component';
import { FullScreenBackgroundPhotoModalComponent } from '../modals/full-screen-background-photo-modal/full-screen-background-photo-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UnfollowConfirmationModalComponent } from 'src/app/components/unfollow-confirmation-modal/unfollow-confirmation-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-another-user-profile',
  templateUrl: './another-user-profile.component.html',
  styleUrls: ['./another-user-profile.component.scss']
})
export class AnotherUserProfileComponent {

  user: any;
  loaded = false;

  userInformationsLoaded = false;
  setProfilePhoto = setProfilePhoto;
  setBackgroundPhoto = setBackgroundPhoto;

  username: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountsService: AccountsService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.username = params['username'];
      this.user = this.accountsService.getUserData();
      if(!this.user){
        this.getUserInformations(this.username, true);
      }
    });
  }

  getUserInformations(userIdentifier, spinner) {
    //spinner ? this.userInformationsLoaded = false : this.userInformationsLoaded = true;
    this.accountsService.getUserByIdentifier(userIdentifier).subscribe({
      next: (res) => {
        this.user = res;
        this.userInformationsLoaded = true;
      },
      error: () => {
        this.userInformationsLoaded = true;
      }
    })
  }

  visualizeProfilePicture(profilePhoto) {
    this.dialog.open(FullScreenProfilePhotoModalComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'fullScreenPictureModalStyle',
      backdropClass: 'transparentModalStyleBackdrop',
      disableClose: true,
      autoFocus: false,
      data: {
        profilePhotoUrl: profilePhoto
      },

    });
  }

  visualizeBackgroundPicture(backgroundPhoto) {
    this.dialog.open(FullScreenBackgroundPhotoModalComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'fullScreenPictureModalStyle',
      backdropClass: 'transparentModalStyleBackdrop',
      disableClose: true,
      autoFocus: false,
      data: {
        backgroundPhotoUrl: backgroundPhoto
      },

    });
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
          this.followUser(profile.userIdentifier);
        }
      }
    })
  }

  followUser(userIdentifier) {
    this.accountsService.followUser(userIdentifier).subscribe({
      complete: () => {
        this.user.isFollowedByMe = !this.user.isFollowedByMe;
        this.getUserInformations(this.username, false);
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

}
