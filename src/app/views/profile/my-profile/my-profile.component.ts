import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountsService } from 'src/app/services/accounts.service';
import { FullScreenProfilePhotoModalComponent } from '../modals/full-screen-profile-photo-modal/full-screen-profile-photo-modal.component';
import { EditProfileModalComponent } from '../modals/edit-profile-modal/edit-profile-modal.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { noProfilePicture } from 'src/app/helpers/no-profile-picture';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { MyProfileModel } from 'src/app/models/my-profile-model';
import { setBackgroundPhoto } from 'src/app/helpers/set-background-photo';
import { FullScreenBackgroundPhotoModalComponent } from '../modals/full-screen-background-photo-modal/full-screen-background-photo-modal.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {

  user: MyProfileModel;
  userInformationsLoaded = false;
  noProfilePicture = noProfilePicture;
  setProfilePhoto = setProfilePhoto;
  setBackgroundPhoto = setBackgroundPhoto;

  constructor(
    private accountsService: AccountsService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ){}

  ngOnInit(){
    this.getLoggedUserAccount(true);

    //Se cair nesse método, quer dizer que o usuário seguiu alguém do card de 'quem seguir'..., serve para atualizar o numero de 'seguindo' instantaneamente
    this.accountsService.followingChange$.subscribe(() => {
      console.log('a')
     this.user ? this.accountsService.getFollowedSomeone() ? this.user.following++ : this.user.following-- : null;
    });
  }

  getLoggedUserAccount(loadScreen){
    loadScreen ? this.userInformationsLoaded = false : this.userInformationsLoaded = true;
    this.accountsService.getLoggedUserAccount().subscribe({
      next: (res) => {
        if(res) this.user = res;
        this.userInformationsLoaded = true;
      },
      error: () => {
        this.userInformationsLoaded = true;
      }
    })
  }

  visualizeProfilePicture(profilePhoto){
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

  visualizeBackgroundPicture(backgroundPhoto){
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

  openEditProfileModal() {
    const dialogRef = this.dialog.open(EditProfileModalComponent, {
      width: '600px',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'modalStyle',
      backdropClass: 'modalStyleBackdrop',
      disableClose: true,
      autoFocus: false,
      data: this.user
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.user.firstName = res.firstName;
          this.user.biography = res.biography;
          this.user.location = res.location;
          this.user.site = res.site;
          this.user.backgroundPhotoUrl = res.backgroundPhotoUrl;
          this.user.profilePhotoUrl = res.profilePhotoUrl;
        }
      }
    })

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
  }

}
