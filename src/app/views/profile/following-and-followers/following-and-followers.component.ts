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
  loggedUser: string;
  accountsList: any[] = [];
  section: string;

  loaded = false;
  loadingMoreContent = false;
  userInformationsLoaded = false;

  previousScrollTop = 0;

  page = 0;
  size = 10;
  noMoreContent = false;

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

    window.addEventListener('scroll', this.scroll, true);
  }

  getUserByIdentifier(username, load) {
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

  getFollowsDetails() {
    if (this.router.url.includes('following')) {
      this.section = 'following';
      this.getUserFollowsDetails(this.section, this.page, this.size);
    }

    if (this.router.url.includes('followers') && !this.router.url.includes('verified_followers') && !this.router.url.includes('known_followers')) {
      this.section = 'followers';
      this.getUserFollowsDetails(this.section, this.page, this.size);
    }

    if (this.router.url.includes('verified_followers')) {
      this.section = 'verified_followers';
      this.getUserFollowsDetails(this.section, this.page, this.size);
    }

    if (this.router.url.includes('known_followers')) {
      this.section = 'known_followers';
      this.getUserFollowsDetails(this.section, this.page, this.size);
    }
  }

  getUserFollowsDetails(url: string, page, size) {
    page > 0 ? this.loadingMoreContent = true : this.loaded = false;
    this.accountsService.getUserFollowsDetails(this.user.username, url, page, size).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.accountsList = this.accountsList.concat(res);
          this.loaded = true;
          this.loadingMoreContent = false;

          //se tiver menos de 10 itens, quer dizer que acabaram os dados, então eu paro de chamar o endpoint.
          if (res.length < 10) this.noMoreContent = true;
        },400)

      },
      error: () => {
        this.loaded = true;
        this.loadingMoreContent = false;
      }
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

    if (profile.username == sessionStorage.getItem('userName')) {
      this.router.navigate(['profile']);
    } else {
      /*Como eu ja possuo os dados do usuário nesse componente, eu vou salvar os dados no service,
     e ao carregar o outro componente (a tela do perfil do usuario que eu redirecionei),
     eu vou pegar os dados do usuário a partir dessa variável que estou preenchendo no service, 
     assim não preciso realizar outra chamada de endpoint para pegar dados que eu ja possuo nesse componente*/
      this.accountsService.setUserData(profile);

      // Navega para a nova URL 
      this.router.navigate(['profile', profile.username]);
    }

  }

  //carregar mais conteudo ao chegar no final da pagina
  scroll = (event): void => {
    if (this.noMoreContent || this.loadingMoreContent) {
      return;
    }

    if (event.srcElement.scrollTop < this.previousScrollTop) {
      // User is scrolling up, do nothing
      return;
    }

    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 1) {
      this.loadMoreContent();
    }

    this.previousScrollTop = event.srcElement.scrollTop;
  }


  loadMoreContent() {
    this.page++;
    this.getUserFollowsDetails(this.section, this.page, this.size);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }
}
