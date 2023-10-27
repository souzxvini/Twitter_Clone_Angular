import { BreakpointObserver } from '@angular/cdk/layout';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { Component, Input } from '@angular/core';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent {

  @Input() user: any;
  setProfilePhoto = setProfilePhoto;

  logoutPanelState = false;

  cdkConnectedOverlayPositions: ConnectedPosition[];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(["(max-width: 1278px)"])
    .pipe(map((result) => result.matches));

  constructor(
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.cdkConnectedOverlayPositions = [{ originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'top', offsetY: -120 }];

    this.breakpointObserver.observe(["(max-width: 1278px)"])
      .subscribe((res) => {
        if (res.matches) {
          this.cdkConnectedOverlayPositions = [{ originX: 'center', originY: 'top', overlayX: 'start', overlayY: 'top', offsetY: -120, offsetX: -30 }];
        } else {
          this.cdkConnectedOverlayPositions = [{ originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'top', offsetY: -120 }];
        }
      })

    this.breakpointObserver.observe(["(max-width: 498px)"])
      .subscribe((res) => {
        if (res.matches) {
          this.logoutPanelState = false;
        }
      })


  }

  logout() {
    this.authService.logout();
  }
}
