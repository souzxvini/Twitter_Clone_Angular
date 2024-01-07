import { BreakpointObserver } from '@angular/cdk/layout';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { Component, Input } from '@angular/core';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, map } from 'rxjs';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
  animations: [
    trigger('fastFadeInAnimation', [
      transition(':enter', [
        animate('200ms', keyframes([
          style({ opacity: 0 }),
          style({ opacity: 1 }),
        ]))
      ])
    ]),
    trigger('fastFadeOutAnimation', [
      transition(':leave', [
        animate('200ms', keyframes([
          style({ opacity: 1 }),
          style({ opacity: 0 }),
        ]))
      ])
    ]),
    trigger('zoomIn', [
      transition(':enter', [
        style({ transform: 'scale(0.5)' }),
        animate('{{time}} cubic-bezier(0,.87,.61,.98)', style({ transform: 'scale(1)' })),
      ], { params: { time: '400ms' } }),
    ]),
  ]
})
export class LogoutButtonComponent {

  @Input() user: any;
  setProfilePhoto = setProfilePhoto;

  logoutPanelState = false;
  cdkConnectedOverlayPositions: ConnectedPosition[];
  arrowStyle = '';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(["(max-width: 1279px)"])
    .pipe(map((result) => result.matches));

  constructor(
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.cdkConnectedOverlayPositions = [{ originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'top', offsetY: -120 }];

    this.breakpointObserver.observe(["(max-width: 1279px)"])
      .subscribe((res) => {
        if (res.matches) {
          this.cdkConnectedOverlayPositions = [{ originX: 'center', originY: 'top', overlayX: 'start', overlayY: 'top', offsetY: -120, offsetX: -30 }];
          this.arrowStyle = 'margin-left: 28px;';
        } else {
          this.cdkConnectedOverlayPositions = [{ originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'top', offsetY: -120 }];
          this.arrowStyle = 'margin-left: 0px;';
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
