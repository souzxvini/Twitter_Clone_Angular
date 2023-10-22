import { Component, Input } from '@angular/core';
import { setBackgroundPhoto } from 'src/app/helpers/set-background-photo';
import { FullScreenProfilePhotoModalComponent } from '../../modals/full-screen-profile-photo-modal/full-screen-profile-photo-modal.component';
import { FullScreenBackgroundPhotoModalComponent } from '../../modals/full-screen-background-photo-modal/full-screen-background-photo-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { AccountsService } from 'src/app/services/accounts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnfollowConfirmationModalComponent } from 'src/app/components/unfollow-confirmation-modal/unfollow-confirmation-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unblocked-user',
  templateUrl: './unblocked-user.component.html',
  styleUrls: ['./unblocked-user.component.scss']
})
export class UnblockedUserComponent {
  @Input() user: any;

  setBackgroundPhoto = setBackgroundPhoto;
  setProfilePhoto = setProfilePhoto;

  loadedCommonFollowers = false;
  commonFollows: any[] = [];

  constructor(
    private dialog: MatDialog,
    private accountsService: AccountsService,
    private snackbar: MatSnackBar,
    private router: Router
  ){}

  ngOnChanges(){
    this.getCommonFollows();
  }

  getCommonFollows() {
    this.loadedCommonFollowers = false;
    this.accountsService.getCommonFollows(this.user.username).subscribe({
      next: (res) => {
        this.commonFollows = res;
        this.loadedCommonFollowers = true;
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

  userNotificationsToggle(username) {
    this.user.isNotificationsAlertedByMe = !this.user.isNotificationsAlertedByMe;
    this.accountsService.userNotificationsToggle(username).subscribe({
      error: () => {
        this.user.isNotificationsAlertedByMe = !this.user.isNotificationsAlertedByMe;
      }
    })
  }

  followUser(username) {
    this.user.isFollowedByMe ? this.user.followers-- : this.user.followers++;
    this.user.isFollowedByMe = !this.user.isFollowedByMe;
    this.accountsService.followUser(username).subscribe({
      error: () => {
        this.user.isFollowedByMe ? this.user.followers-- : this.user.followers++;
        this.user.isFollowedByMe = !this.user.isFollowedByMe;
        this.snackbar.open(
          'Desculpe, houve algum erro ao seguir o usuário. Por favor, tente novamente.',
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

  redirectToFollowing(user) {
    this.accountsService.setUserData(user);
    this.router.navigate(['profile', user.username, 'following']);
  }

  redirectToFollowers(user) {
    this.accountsService.setUserData(user);
    this.router.navigate(['profile', user.username, 'followers']);
  }
}
