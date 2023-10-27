import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/services/sidenav.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { AccountsService } from 'src/app/services/accounts.service';
import { Router } from '@angular/router';

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
  @ViewChild('dashboard', { static: false }) sidenav!: MatSidenav;

  settingsAndPrivacyIsClicked = false;
  setProfilePhoto = setProfilePhoto;
  user: any;
  userInformationsLoaded = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService,
    private accountsService: AccountsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.accountsService.updateMyProfileInfosOnMenuComponenChange$.subscribe(() => {
      this.user = this.accountsService.getUserData();
      if (this.user && this.userInformationsLoaded == true) {
        setTimeout(() => {
          this.accountsService.clearUserData();
        }, 0)
      } else {
        this.getLoggedUserAccount();
      }
    });

    this.sidenavService.buttonClick$.subscribe(() => {
      this.sidenav.toggle();
    });

    this.breakpointObserver.observe(["(max-width: 498px)"])
      .subscribe(() => {
        if (this.sidenav != undefined) {
          this.sidenav.opened = false;
          this.settingsAndPrivacyIsClicked = false;
        }
      })
  }

  getLoggedUserAccount() {
    console.log('a');
    this.userInformationsLoaded = false;
    this.accountsService.getLoggedUserAccount().subscribe({
      next: (res) => {
        if (res) this.user = res;
        this.userInformationsLoaded = true;
      },
      error: () => {
        this.userInformationsLoaded = true;
      }
    })
  }

  redirectToFollowing(user) {
    this.accountsService.setUserData(user);
    this.router.navigate(['profile', user.username, 'following']);
    this.sidenav.toggle();
  }

  redirectToFollowers(user) {
    this.accountsService.setUserData(user);
    this.router.navigate(['profile', user.username, 'followers']);
    this.sidenav.toggle();
  }
}
