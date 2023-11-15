import { Component } from '@angular/core';
import { setBackgroundPhoto } from 'src/app/helpers/set-background-photo';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { AccountsService } from 'src/app/services/accounts.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AnotherProfileModel } from 'src/app/models/another-profile-model';
import { Location } from '@angular/common';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-another-user-profile',
  templateUrl: './another-user-profile.component.html',
  styleUrls: ['./another-user-profile.component.scss']
})
export class AnotherUserProfileComponent {
  user: AnotherProfileModel;
  loaded = false;

  userInformationsLoaded = false;
  setProfilePhoto = setProfilePhoto;
  setBackgroundPhoto = setBackgroundPhoto;

  username: string;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(["(max-width: 498px)"])
    .pipe(map((result) => result.matches));
  prevScrollpos = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountsService: AccountsService,
    private router: Router,
    public location: Location,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.username = params['username'];

      if (this.username == localStorage.getItem('userName')) {
        this.router.navigate(['profile'])
      }
      /*se essa funcao .getUserData() tiver valor, 
      então quer dizer que o usuario clicou para ver o perfil de alguém,
      então eu seto as informações do usuário através do valor que estiver nessa funcao,
      sem precisar chamar o get para trazer as principais informações do usuario*/
      this.user = this.accountsService.getUserData();
      if (!this.user) {
        this.getUserInformations(this.username, true);
      } else {
        this.userInformationsLoaded = true;
        this.accountsService.clearUserData();
      }
    });

    window.addEventListener('scroll', this.scroll, true);
  }

  getUserInformations(username, spinner) {
    spinner ? this.userInformationsLoaded = false : this.userInformationsLoaded = true;
    this.accountsService.getUserByIdentifier(username).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.user = res;
          this.userInformationsLoaded = true;
        }, 300)
      },
      error: () => {
        this.userInformationsLoaded = true;
      }
    })
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
