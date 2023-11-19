import { Component, DestroyRef, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { noProfilePicture } from 'src/app/helpers/no-profile-picture';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { AccountsService } from 'src/app/services/accounts.service';
import { UnfollowConfirmationModalComponent } from '../unfollow-confirmation-modal/unfollow-confirmation-modal.component';
import { Router } from '@angular/router';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MyProfileModel } from 'src/app/models/my-profile-model';

@Component({
  selector: 'app-follow-profile-button',
  templateUrl: './follow-profile-button.component.html',
  styleUrls: ['./follow-profile-button.component.scss']
})
export class FollowProfileButtonComponent {
  private destroyRef = inject(DestroyRef);

  @Input() profile: any;
  @Input() profilesList: any[];

  noProfilePicture = noProfilePicture;
  setProfilePhoto = setProfilePhoto;

  loaded = false;
  isMouseOverFollowingButton: boolean = false;
  currentUrl: string;

  loggedUser: MyProfileModel;

  constructor(
    private dialog: MatDialog,
    private accountsService: AccountsService,
    private snackbar: MatSnackBar,
    private router: Router,
    private globalVariablesService: GlobalVariablesService
  ) { }

  ngOnInit() {
    this.currentUrl = this.router.url;

    this.globalVariablesService.loggedUser$
    .pipe(takeUntilDestroyed(this.destroyRef)) // Unsubscribe when component is destroyed
    .subscribe(user => this.loggedUser = user);
  }

  followUser(username) {
    let profile = this.profilesList.find(profile => profile.username === username);
    profile.isFollowedByMe = !profile.isFollowedByMe;
    profile.isFollowedByMe ? profile.followers++ : profile.followers--;

    const loggedUser = this.globalVariablesService.getCurrentLoggedUser();
    profile.isFollowedByMe ? loggedUser.following++ : loggedUser.following--;

    this.globalVariablesService.updateMyProfileInfos(loggedUser);

    this.accountsService.followUser(username).subscribe({
      complete: () => {
      },
      error: (res) => {
        profile.isFollowedByMe = !profile.isFollowedByMe;
        profile.isFollowedByMe ? profile.followers++ : profile.followers--;
        
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

  setButtonCalc() {
    return localStorage.getItem('Language') == 'pt' ? 'calc(100% - 190px)' : 'calc(100% - 140px)';
  }
}
