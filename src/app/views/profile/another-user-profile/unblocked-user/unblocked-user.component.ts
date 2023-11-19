import { Component, DestroyRef, Input, inject } from '@angular/core';
import { setBackgroundPhoto } from 'src/app/helpers/set-background-photo';
import { FullScreenProfilePhotoModalComponent } from '../../modals/full-screen-profile-photo-modal/full-screen-profile-photo-modal.component';
import { FullScreenBackgroundPhotoModalComponent } from '../../modals/full-screen-background-photo-modal/full-screen-background-photo-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { AccountsService } from 'src/app/services/accounts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnfollowConfirmationModalComponent } from 'src/app/components/unfollow-confirmation-modal/unfollow-confirmation-modal.component';
import { Router } from '@angular/router';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

@Component({
  selector: 'app-unblocked-user',
  templateUrl: './unblocked-user.component.html',
  styleUrls: ['./unblocked-user.component.scss']
})
export class UnblockedUserComponent {
  private destroyRef = inject(DestroyRef);

  @Input() anotherUserProfile: any;

  setBackgroundPhoto = setBackgroundPhoto;
  setProfilePhoto = setProfilePhoto;

  loadedCommonFollowers = false;
  commonFollows: any[] = [];

  constructor(
    private dialog: MatDialog,
    private accountsService: AccountsService,
    private snackbar: MatSnackBar,
    private router: Router,
    private globalVariablesService: GlobalVariablesService
  ){}

  ngOnChanges(){
    this.getCommonFollows();
  }

  getCommonFollows() {
    this.loadedCommonFollowers = false;
    this.accountsService.getCommonFollows(this.anotherUserProfile.username).subscribe({
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
    this.anotherUserProfile.isNotificationsAlertedByMe = !this.anotherUserProfile.isNotificationsAlertedByMe;
    this.accountsService.userNotificationsToggle(username).subscribe({
      error: () => {
        this.anotherUserProfile.isNotificationsAlertedByMe = !this.anotherUserProfile.isNotificationsAlertedByMe;
      }
    })
  }

  followUser(username) {
    this.anotherUserProfile.isFollowedByMe ? this.anotherUserProfile.followers-- : this.anotherUserProfile.followers++;
    this.anotherUserProfile.isFollowedByMe = !this.anotherUserProfile.isFollowedByMe;

    const loggedUser = this.globalVariablesService.getCurrentLoggedUser();
    this.anotherUserProfile.isFollowedByMe ? loggedUser.following++ : loggedUser.following--;

    this.globalVariablesService.updateMyProfileInfos(loggedUser);

    this.accountsService.followUser(username).subscribe({
      error: (res) => {
        this.anotherUserProfile.isFollowedByMe ? this.anotherUserProfile.followers-- : this.anotherUserProfile.followers++;
        this.anotherUserProfile.isFollowedByMe = !this.anotherUserProfile.isFollowedByMe;

        this.anotherUserProfile.isFollowedByMe ? loggedUser.following++ : loggedUser.following--; 
        this.globalVariablesService.updateMyProfileInfos(loggedUser);

        if(res.error.error == '410.010'){
          this.snackbar.open(
            res.error.message,
            '',
            { duration: 5000, panelClass: ['snackbarLoginError'] }
          );
        } else{
          this.snackbar.open(
            'Desculpe, houve algum erro ao seguir o usuário. Por favor, tente novamente.',
            '',
            { duration: 5000, panelClass: ['snackbarLoginError'] }
          );
        }
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

  redirectToFollowing(anotherUserProfile) {
    this.globalVariablesService.setAnotherUser(this.anotherUserProfile);
    this.router.navigate(['profile', anotherUserProfile.username, 'following']);
  }

  redirectToFollowers(anotherUserProfile) {
    this.globalVariablesService.setAnotherUser(this.anotherUserProfile);
    this.router.navigate(['profile', anotherUserProfile.username, 'followers']);
  }
}
