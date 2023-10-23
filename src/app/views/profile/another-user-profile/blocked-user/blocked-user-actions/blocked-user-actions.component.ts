import { Clipboard } from '@angular/cdk/clipboard';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { ModalUnblockUserComponent } from 'src/app/components/modal-unblock-user/modal-unblock-user.component';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-blocked-user-actions',
  templateUrl: './blocked-user-actions.component.html',
  styleUrls: ['./blocked-user-actions.component.scss']
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
