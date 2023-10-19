import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { verifyIfItsLoggedUser } from 'src/app/helpers/verify-if-its-user-logged';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-follows-list',
  templateUrl: './follows-list.component.html',
  styleUrls: ['./follows-list.component.scss']
})
export class FollowsListComponent {

  loaded = false;
  loadingMoreContent = false;

  user: any;

  accountsList: any[] = [];

  section: string;

  page = 0;
  size = 10;
  noMoreContent = false;

  previousScrollTop = 0;

  verifyIfItsLoggedUser = verifyIfItsLoggedUser;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(["(max-width: 498px)"])
    .pipe(map((result) => result.matches));

  prevScrollpos = 0;

  constructor(
    private accountsService: AccountsService,
    public router: Router,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(){
    window.addEventListener('scroll', this.scroll, true);

    this.user = this.accountsService.getUserData();

    this.accountsService.clearUserData();

    /*Se cair nesse método, quer dizer que o usuário seguiu alguém do card de 'quem seguir'...,
    então irá verificar se o usuário seguido está na lista de usuarios mostrada na tela, se sim, 
    vai atualizar o botão de seguindo/seguir + informações*/
    this.accountsService.followedSuggestedUserWhileOnFollowingAndFollowersChange$.subscribe(() => {
      if (this.loaded) {
        var profile = this.accountsList.findIndex(x => x.username == this.accountsService.getUserData().username);
        if (profile !== -1) {
          this.accountsList[profile] = { ...this.accountsList[profile], ...this.accountsService.getUserData() }
          setTimeout(() => {
            this.accountsService.clearUserData();
          }, 0)
        }
      }
    });

    if(this.user){
      this.getFollowsDetails();
    } 
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
        }, 400)

      },
      error: () => {
        this.loaded = true;
        this.loadingMoreContent = false;
      }
    });

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
    this.loadMoreContentScroll(event);
    this.hideHeader(event);
  }

  loadMoreContentScroll(event) {
    if (this.noMoreContent || this.loadingMoreContent) {
      return;
    }

    if (event.target.offsetHeight + event.target.scrollTop == event.target.scrollHeight) {
      this.loadMoreContent();
    }

    this.previousScrollTop = event.srcElement.scrollTop;
  }

  hideHeader(event) {
    const mainContainerHeader = document.getElementById("bluredHeaderStyle");
    this.isHandset$.subscribe(isHandset => {
      if (isHandset) {
        if (event.srcElement.scrollTop < this.prevScrollpos) {
          if (mainContainerHeader) {
            console.log("d")
            mainContainerHeader.style.top = "0";
          }
        } else {
          if (mainContainerHeader) {
            console.log("e")
            mainContainerHeader.style.top = "-119px";
          }
        }
        this.prevScrollpos = event.srcElement.scrollTop;
      } else {
        if (mainContainerHeader) {
          mainContainerHeader.style.top = "0";
        }
      }
    });
  }

  loadMoreContent() {
    this.page++;
    this.getUserFollowsDetails(this.section, this.page, this.size);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }
}
