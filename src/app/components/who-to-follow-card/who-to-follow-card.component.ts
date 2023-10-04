import { Component } from '@angular/core';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { AccountsService } from 'src/app/services/accounts.service';
import { UnfollowConfirmationModalComponent } from '../unfollow-confirmation-modal/unfollow-confirmation-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-who-to-follow-card',
  templateUrl: './who-to-follow-card.component.html',
  styleUrls: ['./who-to-follow-card.component.scss']
})
export class WhoToFollowCardComponent {

  isHovered = false;
  buttonText = 'Following';

  whoToFollowAccounts: any;
  loaded = false;

  setProfilePhoto = setProfilePhoto;

  constructor(
    private accountsService: AccountsService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      params['username'] ? this.getWhoToFollowAccounts(params['username']) : this.getWhoToFollowAccounts();
    });
  }

  getWhoToFollowAccounts(userIdentifier?) {
    this.loaded = false;
    this.accountsService.getWhoToFollowAccounts(0, 3, userIdentifier).subscribe({
      next: (res) => {
        this.whoToFollowAccounts = res;
        this.loaded = true;
      },
      error: () => {
        this.loaded = true;
      }
    })
  }

  followingButonOnHover(hovered: boolean) {
    this.isHovered = hovered;
    this.buttonText = hovered ? 'Unfollow' : 'Following';
  }

  followUser(userIdentifier) {
    this.accountsService.followUser(userIdentifier).subscribe({
      complete: () => {
        let profile = this.whoToFollowAccounts.find(profile => profile.userIdentifier === userIdentifier);
        profile.isFollowedByMe = !profile.isFollowedByMe;
      },
      error: () => {
        this.loaded = true;
        this.snackbar.open(
          'Desculpe, houve algum erro. Por favor, tente novamente.',
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
          this.followUser(profile.userIdentifier);
        }
      }
    })
  }

  redirectToProfile(account) {
    // Define os dados do usuário no serviço
    this.accountsService.setUserData(account);

    // Navega para a nova URL
    this.router.navigate(['/novo-componente']);
    this.router.navigate(['profile', account.userIdentifier]);
  }
}
