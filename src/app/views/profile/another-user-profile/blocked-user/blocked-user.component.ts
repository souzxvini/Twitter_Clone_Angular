import { Component, Input } from '@angular/core';
import { setBackgroundPhoto } from 'src/app/helpers/set-background-photo';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { FullScreenProfilePhotoModalComponent } from '../../modals/full-screen-profile-photo-modal/full-screen-profile-photo-modal.component';
import { FullScreenBackgroundPhotoModalComponent } from '../../modals/full-screen-background-photo-modal/full-screen-background-photo-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AccountsService } from 'src/app/services/accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blocked-user',
  templateUrl: './blocked-user.component.html',
  styleUrls: ['./blocked-user.component.scss']
})
export class BlockedUserComponent {

  @Input() user: any;

  setBackgroundPhoto = setBackgroundPhoto;
  setProfilePhoto = setProfilePhoto;

  constructor(
    private dialog: MatDialog,
    private accountsService: AccountsService,
    private router: Router
  ){

  }

  unblockProfile(username) {
    this.user.isBlockedByMe = !this.user.isBlockedByMe;
    this.accountsService.blockToggle(username).subscribe({
      error: () => {
        this.user.isBlockedByMe = !this.user.isBlockedByMe;
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

  redirectToFollowing(user) {
    this.accountsService.setUserData(user);
    this.router.navigate(['profile', user.username, 'following'], { replaceUrl: true });
  }

  redirectToFollowers(user) {
    this.accountsService.setUserData(user);
    this.router.navigate(['profile', user.username, 'followers'], { replaceUrl: true });
  }

}
