import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { noProfilePicture } from 'src/app/helpers/no-profile-picture';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { AccountsService } from 'src/app/services/accounts.service';
import { UnfollowConfirmationModalComponent } from '../unfollow-confirmation-modal/unfollow-confirmation-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follow-profile-button',
  templateUrl: './follow-profile-button.component.html',
  styleUrls: ['./follow-profile-button.component.scss']
})
export class FollowProfileButtonComponent {

  @Input() profile: any;
  @Input() profilesList: any[];

  noProfilePicture = noProfilePicture;
  setProfilePhoto = setProfilePhoto;

  loaded = false;
  isMouseOverFollowingButton: boolean = false;
  currentUrl: string;

  constructor(
    private dialog: MatDialog,
    private accountsService: AccountsService,
    private snackbar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    this.currentUrl = this.router.url;
  }

  followUser(username) {
    let profile = this.profilesList.find(profile => profile.username === username);
    profile.isFollowedByMe = !profile.isFollowedByMe;
    profile.isFollowedByMe ? profile.followers++ : profile.followers--;

    this.notifyComponents(profile);

    this.accountsService.followUser(username).subscribe({
      complete: () => {
      },
      error: () => {
        profile.isFollowedByMe = !profile.isFollowedByMe;
        profile.isFollowedByMe ? profile.followers++ : profile.followers--;
        
        this.notifyComponents(profile);

        this.loaded = true;
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

  setFollowingButtonHoverWidth() {
    return localStorage.getItem('Language') == 'pt' ? 'width: 150px;' : 'width: 100px;';
  }

  setButtonCalc() {
    return localStorage.getItem('Language') == 'pt' ? 'calc(100% - 190px)' : 'calc(100% - 140px)';
  }

  notifyComponents(profile) {
    //Se usuario estiver na sua tela de perfil, e seguir alguém do card 'who to follow'
    if (this.currentUrl == '/profile') {
      this.accountsService.followedSuggestedUserWhileOnYourProfileScreen(profile.isFollowedByMe);
    }

    //se usuario estiver na tela following-and-followers e seguir alguém do card who to follow
    if (this.currentUrl.includes('profile') &&
      (
        this.currentUrl.includes('verified_followers') ||
        this.currentUrl.includes('followers') ||
        this.currentUrl.includes('known_followers') ||
        this.currentUrl.includes('following')
      )) {
      this.accountsService.followedSuggestedUserWhileOnFollowingAndFollowersScreen(profile);
    }
  }
}
