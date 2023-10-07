import { Component } from '@angular/core';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { AccountsService } from 'src/app/services/accounts.service';
import { UnfollowConfirmationModalComponent } from '../unfollow-confirmation-modal/unfollow-confirmation-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AnotherProfileModel } from 'src/app/models/another-profile-model';

@Component({
  selector: 'app-who-to-follow-card',
  templateUrl: './who-to-follow-card.component.html',
  styleUrls: ['./who-to-follow-card.component.scss']
})
export class WhoToFollowCardComponent {

  isHovered = false;
  buttonText = 'Following';
  whoToFollowAccounts: AnotherProfileModel[];
  loaded = false;

  currentUrl: string;

  setProfilePhoto = setProfilePhoto;

  constructor(
    private accountsService: AccountsService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.currentUrl = this.router.url;

    this.activatedRoute.params.subscribe(params => {
      params['username'] ? this.getWhoToFollowAccounts(params['username']) : this.getWhoToFollowAccounts();
    });

  }

  getWhoToFollowAccounts(username?) {
    this.loaded = false;
    this.accountsService.getWhoToFollowAccounts(0, 3, username).subscribe({
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

  followUser(username) {
    let profile = this.whoToFollowAccounts.find(profile => profile.username === username);
    profile.isFollowedByMe = !profile.isFollowedByMe;
    profile.isFollowedByMe ? profile.followers++ : profile.followers--;

    //se a rota for /profile apenas
    if (this.currentUrl == '/profile') {
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

  //Método para redirecionar o usuario logado para o perfil de outra pessoa
  redirectToProfile(account: AnotherProfileModel) {
    /*Como eu ja possuo os dados do usuário nesse componente, eu vou salvar os dados no service,
     e ao carregar o outro componente (a tela do perfil do usuario que eu redirecionei),
     eu vou pegar os dados do usuário a partir dessa variável que estou preenchendo no service, 
     assim não preciso realizar outra chamada de endpoint para pegar dados que eu ja possuo nesse componente*/
    this.accountsService.setUserData(account);

    // Navega para a nova URL
    this.router.navigate(['/novo-componente']);
    this.router.navigate(['profile', account.username]);
  }
}
