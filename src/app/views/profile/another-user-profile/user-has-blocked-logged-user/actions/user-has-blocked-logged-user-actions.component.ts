import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { ModalBlockUserComponent } from 'src/app/components/modal-block-user/modal-block-user.component';
import { ModalUnblockUserComponent } from 'src/app/components/modal-unblock-user/modal-unblock-user.component';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-user-has-blocked-logged-user-actions',
  templateUrl: './user-has-blocked-logged-user-actions.component.html',
  styleUrls: ['./user-has-blocked-logged-user-actions.component.scss']
})
export class UserHasBlockedLoggedUserActionsComponent {

  @Input() user: any;
  morePanelState = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(["(max-width: 498px)"])
    .pipe(map((result) => result.matches));

  constructor(
    private accountsService: AccountsService,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

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
    this.user.isBlockedByMe = !this.user.isBlockedByMe;

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
      }
    })
  }

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
