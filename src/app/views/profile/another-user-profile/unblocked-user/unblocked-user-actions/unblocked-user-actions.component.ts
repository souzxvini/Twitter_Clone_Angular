import { Clipboard } from '@angular/cdk/clipboard';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { AccountsService } from 'src/app/services/accounts.service';
import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalBlockUserComponent } from 'src/app/components/modal-block-user/modal-block-user.component';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-unblocked-user-actions',
  templateUrl: './unblocked-user-actions.component.html',
  styleUrls: ['./unblocked-user-actions.component.scss'],
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
export class UnblockedUserActionsComponent {

  @Input() user: any;
  morePanelState = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(["(max-width: 498px)"])
    .pipe(map((result) => result.matches));

  constructor(
    private accountsService: AccountsService,
    private snackbar: MatSnackBar,
    private clipboard: Clipboard,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private globalVariablesService: GlobalVariablesService
  ) { }

  copyProfileURL() {
    this.morePanelState = !this.morePanelState;
    if (this.clipboard.copy(window.location.href)) {
      this.snackbar.open(
        'Copiado para a área de transferência.',
        '',
        { duration: 5000, panelClass: ['snackbarLoginError'] }
      );
    }
  }

  openBlockUserModal(user){
    this.morePanelState = !this.morePanelState;
    const dialogRef = this.dialog.open(ModalBlockUserComponent, {
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
          this.blockAccount(user.username);
        }
      }
    })
  }

  blockAccount(username) {
    const loggedUser = this.globalVariablesService.getCurrentLoggedUser();

    this.user.isBlockedByMe = !this.user.isBlockedByMe;
    loggedUser.followers--;
    const followedByMe = this.user.isFollowedByMe;
    if (followedByMe) {
      this.user.isFollowedByMe = false;
      this.user.followers = this.user.followers - 1;
      loggedUser.following--;
    }

    const followingMe = this.user.isFollowingMe;
    if (followingMe) {
      this.user.isFollowingMe = false;
    }
    this.globalVariablesService.updateMyProfileInfos(loggedUser);

    this.accountsService.blockToggle(username).subscribe({
      complete: () => {
        let mySnackBar: MatSnackBarRef<TextOnlySnackBar> = this.snackbar.open(
          'Bloqueado com sucesso.',
          'Desbloquear',
          { duration: 5000, panelClass: ['snackbarLoginError'] }
        );

        mySnackBar.onAction().subscribe(() => {
          mySnackBar.dismiss();
          if (this.user.isBlockedByMe == true) {
            this.user.isBlockedByMe = false;
            this.accountsService.blockToggle(username).subscribe({
              error: () => {
                this.user.isBlockedByMe = true;
              }
            })
          }
        });
      },
      error: () => {
        this.snackbar.open(
          'Erro ao bloquear usuário',
          '',
          { duration: 50000, panelClass: ['snackbarLoginError'] }
        );
        this.user.isBlockedByMe = !this.user.isBlockedByMe;
        loggedUser.followers++;
        if (followedByMe) {
          this.user.isFollowedByMe = true;
          this.user.followers = this.user.followers + 1;
          loggedUser.following++;
        }
        if (followingMe) {
          this.user.isFollowingMe = true;
        }
        this.globalVariablesService.updateMyProfileInfos(loggedUser);
      }
    })
  }
}
