import { Component, Input } from '@angular/core';
import { noProfilePicture } from 'src/app/helpers/no-profile-picture';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { UnfollowConfirmationModalComponent } from '../unfollow-confirmation-modal/unfollow-confirmation-modal.component';
import { MatDialog  } from '@angular/material/dialog';
import { AccountsService } from 'src/app/services/accounts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { verifyIfItsLoggedUser } from 'src/app/helpers/verify-if-its-user-logged';

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
  currentUrl: string;

  constructor(
    private dialog: MatDialog,
    private accountsService: AccountsService,
    private snackbar: MatSnackBar,
    private router: Router
    ){}
  
    ngOnInit(){
      this.currentUrl = this.router.url;
    }

  followUser(username) {
    let profile = this.suggestedProfiles.find(profile => profile.username === username);
    profile.isFollowedByMe = !profile.isFollowedByMe;
    profile.isFollowedByMe ? profile.followers++ : profile.followers--;

    //se a rota for /profile apenas
    if (this.suggestedProfiles == '/profile') {
      this.accountsService.followedSuggestedUserWhileOnYourProfileScreen(profile.isFollowedByMe);
    }

    this.accountsService.followUser(username).subscribe({
      complete: () => {
      },
      error: () => {
        profile.isFollowedByMe = !profile.isFollowedByMe;
        profile.isFollowedByMe ? profile.followers++ : profile.followers--;

        //se a rota for /profile apenas
        if (this.currentUrl == '/profile') {
          this.accountsService.followedSuggestedUserWhileOnYourProfileScreen(profile.isFollowedByMe);
        }
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

  setFollowingButtonHoverWidth(){
    return localStorage.getItem('Language') == 'pt' ?  'width: 150px;' : 'width: 100px;';
  }

  setButtonCalc(){
    return localStorage.getItem('Language') == 'pt' ?  'calc(100% - 150px)' : 'calc(100% - 100px)';
  }

  verifyIfItsLoggedUser(username){
    return username == sessionStorage.getItem('userName');
  }
}
