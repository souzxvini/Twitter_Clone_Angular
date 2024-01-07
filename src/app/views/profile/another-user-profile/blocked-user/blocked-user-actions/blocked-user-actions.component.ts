import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { ModalUnblockUserComponent } from 'src/app/components/modal-unblock-user/modal-unblock-user.component';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-blocked-user-actions',
  templateUrl: './blocked-user-actions.component.html',
  styleUrls: ['./blocked-user-actions.component.scss'],
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
export class BlockedUserActionsComponent {

  @Input() user: any;
  morePanelState = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(["(max-width: 498px)"])
    .pipe(map((result) => result.matches));

  constructor(
    private accountsService: AccountsService,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
  ) { }

  openUnblockUserModal(user){
    this.morePanelState = !this.morePanelState;
    const dialogRef = this.dialog.open(ModalUnblockUserComponent, {
      width: '320px',
      panelClass: 'bordered-dialog',
      backdropClass: 'modalStyleBackdrop',
      disableClose: false,
      autoFocus: false,
      data: user
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.unblockProfile(user.username);
        }
      }
    })
  }

  unblockProfile(username) {
    this.user.isBlockedByMe = !this.user.isBlockedByMe;
    this.accountsService.blockToggle(username).subscribe({
      error: () => {
        this.user.isBlockedByMe = !this.user.isBlockedByMe;
      }
    })
  }
}
