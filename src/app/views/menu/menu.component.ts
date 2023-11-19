import { Component, DestroyRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/services/sidenav.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { AccountsService } from 'src/app/services/accounts.service';
import { Router } from '@angular/router';
import { MyProfileModel } from 'src/app/models/my-profile-model';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('true', style({ transform: 'rotate(0)' })),
      state('false', style({ transform: 'rotate(-180deg)' })),
      transition('false => true', animate('100ms')),
      transition('true => false', animate('100ms'))
    ])
  ],
})
export class MenuComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  @ViewChild('dashboard', { static: false }) sidenav!: MatSidenav;

  settingsAndPrivacyIsClicked = false;
  setProfilePhoto = setProfilePhoto;
  loggedUser: MyProfileModel;
  userInformationsLoaded = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService,
    private accountsService: AccountsService,
    private router: Router,
    private globalVariablesService: GlobalVariablesService
  ) { }

  ngOnInit() {
    this.globalVariablesService.loggedUser$
    .pipe(takeUntilDestroyed(this.destroyRef)) // Unsubscribe when component is destroyed
    .subscribe(user => this.loggedUser = user);

    //Abrir/fechar sidenav menu on mobile version
    this.sidenavService.buttonClick$.subscribe(() => {
      this.sidenav.toggle();
    });

    //verificar se esta no tamanho mobile
    this.breakpointObserver.observe(["(max-width: 498px)"])
      .subscribe(() => {
        if (this.sidenav != undefined) {
          this.sidenav.opened = false;
          this.settingsAndPrivacyIsClicked = false;
        }
      })

    this.getLoggedUserAccount();
  }

  getLoggedUserAccount() {
    this.userInformationsLoaded = false;
    this.accountsService.getLoggedUserAccount().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.globalVariablesService.updateMyProfileInfos(res);
          this.userInformationsLoaded = true;
        }, 500)
      },
      error: () => {
        this.userInformationsLoaded = true;
      }
    })
  }

  redirectToFollowing(user) {
    this.globalVariablesService.setAnotherUser(user);
    this.router.navigate(['profile', user.username, 'following']);
    this.sidenav.toggle();
  }

  redirectToFollowers(user) {
    this.globalVariablesService.setAnotherUser(user);
    this.router.navigate(['profile', user.username, 'followers']);
    this.sidenav.toggle();
  }
}
