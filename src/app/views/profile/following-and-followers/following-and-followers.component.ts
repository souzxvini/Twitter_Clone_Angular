import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { verifyIfItsLoggedUser } from 'src/app/helpers/verify-if-its-user-logged';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-following-and-followers',
  templateUrl: './following-and-followers.component.html',
  styleUrls: ['./following-and-followers.component.scss']
})
export class FollowingAndFollowersComponent {

  verifyIfItsLoggedUser = verifyIfItsLoggedUser;
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

  user: any;
  loggedUser: string;
  username = this.activatedRoute.snapshot.params['username'];

  loaded = false;
  userInformationsLoaded = false;

  selectedTabIndex: number;

  constructor(
    private accountsService: AccountsService,
    public location: Location,
    public router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.loggedUser = localStorage.getItem('userName');

    //ao carregar o componente pela primeira vez
    this.activatedRoute.params.subscribe(() => {
      this.user = this.accountsService.getUserData();
      if (!this.user) {
        this.getUserByIdentifier(this.username, true);
      } else {
        this.userInformationsLoaded = true;
        this.getTabIndex();
      }
    });

    //ao mudar a rota
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.userInformationsLoaded) {
          this.user = this.accountsService.getUserData();
          this.userInformationsLoaded = true;
          this.getTabIndex();
        }
      }
    });
  }

  getUserByIdentifier(username, load) {
    load ? this.userInformationsLoaded = false : this.userInformationsLoaded = true;
    this.accountsService.getUserByIdentifier(username).subscribe({
      next: (res) => {
        this.user = res;
        this.accountsService.setUserData(this.user);
        this.userInformationsLoaded = true;
        this.getTabIndex();
      },
      error: () => {
        this.userInformationsLoaded = true;
      }
    })
  }

  getTabIndex() {
    console.log('tabIndex')
    if (this.router.url.includes('verified_followers')) {
      setTimeout(() => {
        this.tabGroup.selectedIndex = 0;
      }, 0);

    }

    if (this.router.url.includes('known_followers')) {
      setTimeout(() => {
        this.tabGroup.selectedIndex = 1;
      }, 0);

    }

    if (this.router.url.includes('followers') && !this.router.url.includes('verified_followers') && !this.router.url.includes('known_followers')) {
      setTimeout(() => {
        verifyIfItsLoggedUser(this.router.url) ? this.tabGroup.selectedIndex = 1 : this.tabGroup.selectedIndex = 2;
      }, 0);

    }

    if (this.router.url.includes('following')) {
      setTimeout(() => {
        verifyIfItsLoggedUser(this.router.url) ? this.tabGroup.selectedIndex = 2 : this.tabGroup.selectedIndex = 3;
      }, 0);

    }
  }

  tabChange(selectedIndex) {
    if (verifyIfItsLoggedUser(this.router.url)) {
      if (selectedIndex == 0) {
        this.accountsService.setUserData(this.user);
        this.router.navigate(['profile', this.user.username, 'verified_followers']);
      };
      if (selectedIndex == 1) {
        this.accountsService.setUserData(this.user);
        this.router.navigate(['profile', this.user.username, 'followers']);
      }
      if (selectedIndex == 2) {
        this.accountsService.setUserData(this.user);
        this.router.navigate(['profile', this.user.username, 'following']);
      }
    } else {
      if (selectedIndex == 0) {
        this.accountsService.setUserData(this.user);
        this.router.navigate(['profile', this.user.username, 'verified_followers']);
      }
      if (selectedIndex == 1) {
        this.accountsService.setUserData(this.user);
        this.router.navigate(['profile', this.user.username, 'known_followers']);
      }
      if (selectedIndex == 2) {
        this.accountsService.setUserData(this.user);
        this.router.navigate(['profile', this.user.username, 'followers']);
      }
      if (selectedIndex == 3) {
        this.accountsService.setUserData(this.user);
        this.router.navigate(['profile', this.user.username, 'following']);
      }
    }
  }

  back() {
    this.accountsService.setUserData(this.user);
    this.location.back();
  }

}
