import { Component, DestroyRef, inject } from '@angular/core';
import { setBackgroundPhoto } from 'src/app/helpers/set-background-photo';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { AccountsService } from 'src/app/services/accounts.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AnotherProfileModel } from 'src/app/models/another-profile-model';
import { Location } from '@angular/common';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { GlobalVariables } from 'src/app/shared/shared-material/Alyle.module';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import { MyProfileModel } from 'src/app/models/my-profile-model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-another-user-profile',
  templateUrl: './another-user-profile.component.html',
  styleUrls: ['./another-user-profile.component.scss']
})
export class AnotherUserProfileComponent {
  anotherUserProfile: AnotherProfileModel;
  username: string;

  loaded = false;
  userInformationsLoaded = false;

  setProfilePhoto = setProfilePhoto;
  setBackgroundPhoto = setBackgroundPhoto;

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
    private globalVariablesService: GlobalVariablesService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.username = params['username'];

      //Se passar o nome do usuário logado na url, redireciona para o perfil dele
      if (this.username == sessionStorage.getItem('userName')) {
        this.router.navigate(['profile'], { replaceUrl: true })
      }

      /*se essa funcao .getUserData() tiver valor, 
      então quer dizer que o usuario clicou para ver o perfil de alguém,
      então eu seto as informações do usuário através do valor que estiver nessa funcao,
      sem precisar chamar o get para trazer as principais informações do usuario*/
      this.anotherUserProfile = this.globalVariablesService.getAnotherUser();
      if (!this.anotherUserProfile) {
        this.getUserInformations(this.username);
      } else {
        this.userInformationsLoaded = true;
        this.globalVariablesService.clearAnotherUser();
      }
    });

    window.addEventListener('scroll', this.scroll, true);
  }

  getUserInformations(username) {
    this.userInformationsLoaded = false;
    this.accountsService.getUserByIdentifier(username).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.anotherUserProfile = res;
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
