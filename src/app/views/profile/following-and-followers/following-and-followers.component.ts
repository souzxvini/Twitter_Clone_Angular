import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { verifyIfItsLoggedUser } from 'src/app/helpers/verify-if-its-user-logged';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-following-and-followers',
  templateUrl: './following-and-followers.component.html',
  styleUrls: ['./following-and-followers.component.scss']
})
export class FollowingAndFollowersComponent {

  verifyIfItsLoggedUser = verifyIfItsLoggedUser;

  user: any;
  userInformationsLoaded = false;
  loggedUser: string;
  accountsList: any[];
  section: string;

  loaded = false;

  constructor(
    private accountsService: AccountsService,
    private location: Location,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loggedUser = sessionStorage.getItem('userName');

    this.activatedRoute.params.subscribe(params => {
      
      this.user = this.accountsService.getUserData();
      if (!this.user) {
        this.getUserByIdentifier(params['username'], true);
      } else {
        this.userInformationsLoaded = true;
        this.accountsService.clearUserData();
        this.getFollowsDetails();
      }
    });
  }

  getUserByIdentifier(username, load){
    load ? this.userInformationsLoaded = false : this.userInformationsLoaded = true;
    this.accountsService.getUserByIdentifier(username).subscribe({
      next: (res) => {
        this.user = res;
        this.userInformationsLoaded = true;
        this.getFollowsDetails();
      },
      error: () => {
        this.userInformationsLoaded = true;
      }
    })
  }

  getFollowsDetails(){
    if(this.router.url.includes('following')){
      this.section = 'following';
      this.getUserFollowsDetails('following');
    }

    if(this.router.url.includes('followers') && !this.router.url.includes('verified_followers')  && !this.router.url.includes('known_followers')){
      this.section = 'followers';
      this.getUserFollowsDetails('followers');
    }

    if(this.router.url.includes('verified_followers')){
      this.section = 'verified_followers';
      this.getUserFollowsDetails('verified_followers');
    }

    if(this.router.url.includes('known_followers')){
      this.section = 'known_followers';
      this.getUserFollowsDetails('known_followers');
    }
  }

  getUserFollowsDetails(url: string){
    this.loaded = false;
    this.accountsService.getUserFollowsDetails(this.user.username, url, 0 , 10).subscribe({
      next: (res) => {
        this.accountsList = res;
        this.loaded = true;
      },
      error: () => {this.loaded = true;}
    });
  }

  goBack() {
    this.accountsService.setUserData(this.user);
    this.location.back()
  }

  redirect(url) {
    this.accountsService.setUserData(this.user);
    this.router.navigate(['profile', this.user.username, url])
  }

  //Método para redirecionar o usuario logado para o perfil de outra pessoa
  redirectToProfile(profile: any) {
    
     if(profile.username == sessionStorage.getItem('userName')){
        this.router.navigate(['profile' ]);
     }else{
      /*Como eu ja possuo os dados do usuário nesse componente, eu vou salvar os dados no service,
     e ao carregar o outro componente (a tela do perfil do usuario que eu redirecionei),
     eu vou pegar os dados do usuário a partir dessa variável que estou preenchendo no service, 
     assim não preciso realizar outra chamada de endpoint para pegar dados que eu ja possuo nesse componente*/
      this.accountsService.setUserData(profile);

      // Navega para a nova URL 
      this.router.navigate(['profile', profile.username]);
     }
    
  }

}
