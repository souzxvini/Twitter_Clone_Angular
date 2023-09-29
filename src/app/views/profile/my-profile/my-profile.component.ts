import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountsService } from 'src/app/services/accounts.service';
import { FullScreenProfilePhotoModalComponent } from '../modals/full-screen-profile-photo-modal/full-screen-profile-photo-modal.component';
import { EditProfileModalComponent } from '../modals/edit-profile-modal/edit-profile-modal.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { convertBytesToURL } from 'src/app/helpers/convert-bytes-to-url';
import { noProfilePicture } from 'src/app/helpers/no-profile-picture';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {

  user: any;
  userInformationsLoaded = false;
  noProfilePicture = noProfilePicture;
  convertBytesToURL = convertBytesToURL;
  setProfilePhoto = setProfilePhoto;

  constructor(
    private accountsService: AccountsService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ){}

  ngOnInit(){
    this.getLoggedUserAccount();
  }

  getLoggedUserAccount(){
    this.userInformationsLoaded = false;
    this.accountsService.getLoggedUserAccount().subscribe({
      next: (res) => {
        if(res) this.user = res;
        console.log(this.user)
        this.userInformationsLoaded = true;
      },
      error: () => {
        this.userInformationsLoaded = true;
      }
    })
  }

  visualizeProfilePicture(profilePhoto, xposition, yposition){
    this.dialog.open(FullScreenProfilePhotoModalComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'fullScreenPictureModalStyle',
      backdropClass: 'transparentModalStyleBackdrop',
      disableClose: true,
      autoFocus: false,
      data: {
        profilePhoto: profilePhoto,
        xposition: xposition,
        yposition: yposition
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
