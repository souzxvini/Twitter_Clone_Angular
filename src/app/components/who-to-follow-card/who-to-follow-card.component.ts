import { Component } from '@angular/core';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { AccountsService } from 'src/app/services/accounts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnotherProfileModel } from 'src/app/models/another-profile-model';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

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

  setProfilePhoto = setProfilePhoto;

  constructor(
    private accountsService: AccountsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private globalVariablesService: GlobalVariablesService

  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      params['username'] ? this.getWhoToFollowAccounts(params['username']) : this.getWhoToFollowAccounts();
    });

    /*Se cair nesse método, quer dizer que o usuário seguiu alguém da tela seguidores/seguindo...,
    então irá verificar se o usuário seguido está na lista de perfis sugeridos mostrados no card, se sim, 
    vai atualizar o botão de seguindo/seguir + informações*/
    this.globalVariablesService.followedUserWhileOnFollowingAndFollowersChange$.subscribe(() => {
      if(this.loaded){
        var profile = this.whoToFollowAccounts.findIndex(x => x.username == this.globalVariablesService.getAnotherUser().username);
        if (profile !== -1){
          this.whoToFollowAccounts[profile] = { ...this.whoToFollowAccounts[profile], ...this.globalVariablesService.getAnotherUser()}
          setTimeout(() => {
            this.globalVariablesService.clearAnotherUser();
          }, 0)
        }
      }
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

  //Método para redirecionar o usuario logado para o perfil de outra pessoa
  redirectToProfile(account: AnotherProfileModel) {
    /*Como eu ja possuo os dados do usuário nesse componente, eu vou salvar os dados no service,
     e ao carregar o outro componente (a tela do perfil do usuario que eu redirecionei),
     eu vou pegar os dados do usuário a partir dessa variável que estou preenchendo no service, 
     assim não preciso realizar outra chamada de endpoint para pegar dados que eu ja possuo nesse componente*/
    this.globalVariablesService.setAnotherUser(account);

    // Navega para a nova URL
    this.router.navigate(['profile', account.username]);
  }

  redirect(){
    this.router.navigate(['connect_people']);
  }
}
