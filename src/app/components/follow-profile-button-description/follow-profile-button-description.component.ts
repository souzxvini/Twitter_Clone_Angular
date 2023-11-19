import { Component, Input } from '@angular/core';
import { noProfilePicture } from 'src/app/helpers/no-profile-picture';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { UnfollowConfirmationModalComponent } from '../unfollow-confirmation-modal/unfollow-confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AccountsService } from 'src/app/services/accounts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ModalUnblockUserComponent } from '../modal-unblock-user/modal-unblock-user.component';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

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
  isMouseOverFollowingButton: boolean = false;
  isMouseOverBlockedButton: boolean = false;
  currentUrl: string;

  constructor(
    private dialog: MatDialog,
    private accountsService: AccountsService,
    private snackbar: MatSnackBar,
    private router: Router,
    private globalVariablesService: GlobalVariablesService
  ) { }

  ngOnInit() {
    this.currentUrl = this.router.url;
  }

  followUser(username) {
    let profile = this.suggestedProfiles.find(profile => profile.username === username);
    profile.isFollowedByMe = !profile.isFollowedByMe;
    profile.isFollowedByMe ? profile.followers++ : profile.followers--;

    const loggedUser = this.globalVariablesService.getCurrentLoggedUser();
    profile.isFollowedByMe ? loggedUser.following++ : loggedUser.following--;

    this.globalVariablesService.updateMyProfileInfos(loggedUser);

    //se usuario estiver na tela following-and-followers e seguir alguém do card who to follow
    if (this.currentUrl.includes('profile') &&
      (
        this.currentUrl.includes('verified_followers') ||
        this.currentUrl.includes('followers') ||
        this.currentUrl.includes('known_followers') ||
        this.currentUrl.includes('following')
      )) {
      this.globalVariablesService.followedUserWhileOnFollowingAndFollowersScreen(profile);
    }

    this.accountsService.followUser(username).subscribe({
      complete: () => {
      },
      error: (res) => {
        profile.isFollowedByMe = !profile.isFollowedByMe;
        profile.isFollowedByMe ? profile.followers++ : profile.followers--;

        profile.isFollowedByMe ? loggedUser.following++ : loggedUser.following--;
        this.globalVariablesService.updateMyProfileInfos(loggedUser);

        //se usuario estiver na tela following-and-followers e seguir alguém do card who to follow
        if (this.currentUrl.includes('profile') &&
          (
            this.currentUrl.includes('verified_followers') ||
            this.currentUrl.includes('followers') ||
            this.currentUrl.includes('known_followers') ||
            this.currentUrl.includes('following')
          )) {
          this.globalVariablesService.followedUserWhileOnFollowingAndFollowersScreen(profile);
        }

        this.loaded = true;

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

  setFollowingButtonHoverWidth() {
    return localStorage.getItem('Language') == 'pt' ? 'width: 150px;' : 'width: 100px;';
  }

  verifyIfItsLoggedUser(username) {
    return username == localStorage.getItem('userName');
  }

  openUnblockUserModal(profile){
    const dialogRef = this.dialog.open(ModalUnblockUserComponent, {
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
          this.unblockProfile(profile.username);
        }
      }
    })
  }

  unblockProfile(username) {
    this.profile.isBlockedByMe = !this.profile.isBlockedByMe;
    this.accountsService.blockToggle(username).subscribe({
      error: () => {
        this.profile.isBlockedByMe = !this.profile.isBlockedByMe;
      }
    })
  }
}
