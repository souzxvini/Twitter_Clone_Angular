import { Component, DestroyRef, inject } from '@angular/core';
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
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Location } from '@angular/common';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
  private destroyRef = inject(DestroyRef);

  user: MyProfileModel;

  noProfilePicture = noProfilePicture;
  setProfilePhoto = setProfilePhoto;
  setBackgroundPhoto = setBackgroundPhoto;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(["(max-width: 498px)"])
    .pipe(map((result) => result.matches));

  prevScrollpos = 0;

  constructor(
    private accountsService: AccountsService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public location: Location,
    private globalVariablesService: GlobalVariablesService
  ){}

  ngOnInit(){
    this.globalVariablesService.loggedUser$
    .pipe(takeUntilDestroyed(this.destroyRef)) // Unsubscribe when component is destroyed
    .subscribe(user => this.user = user);

    window.addEventListener('scroll', this.scroll, true);
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
          this.globalVariablesService.updateMyProfileInfosOnMenuComponent(this.user);
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

  redirectToFollowing(user){
    this.globalVariablesService.setAnotherUser(user);
    this.router.navigate(['profile', user.username, 'following']);
  }

  redirectToFollowers(user){
    this.globalVariablesService.setAnotherUser(user);
    this.router.navigate(['profile', user.username, 'followers']);
  }

  scroll = (event): void => {
    const mainContainerHeader = document.getElementById("bluredHeaderStyle");
    this.isHandset$.subscribe(isHandset => {
      if (isHandset) {
        if (event.srcElement.scrollTop < this.prevScrollpos) {
          if (mainContainerHeader) {
            mainContainerHeader.style.top = "0";
          }
        } else {
          if (mainContainerHeader) {
            mainContainerHeader.style.top = "-53px";
          }
        }
        this.prevScrollpos = event.srcElement.scrollTop;
      } else {
        if (mainContainerHeader) {
          mainContainerHeader.style.top = "0";
        }
      }
    });
  };

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

}
