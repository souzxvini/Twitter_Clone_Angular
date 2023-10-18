import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/services/sidenav.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { MyProfileModel } from 'src/app/models/my-profile-model';
import { AuthModel } from 'src/app/models/auth-model';

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
  authModel: AuthModel;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService,
    private authService: AuthService
    ) { }

  ngOnInit() {
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

    this.fillUserInformations();
  }

  fillUserInformations(){
    this.authModel = new AuthModel();
    this.authModel.firstName = sessionStorage.getItem('firstName');
    this.authModel.username = sessionStorage.getItem('userName');
    this.authModel.isVerified = sessionStorage.getItem('isVerified') == 'true' ? true : false;
    this.authModel.profilePhotoUrl = sessionStorage.getItem('profilePhotoUrl');
  }

  logout(){
    this.authService.logout();
  }
}
