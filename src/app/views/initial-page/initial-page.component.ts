import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountModalComponent } from './create-account-modal/create-account-modal.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent {

  constructor(
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) { }

  openCreateAccountDialog() {
    const dialogRef = this.dialog.open(CreateAccountModalComponent, {
      width: '600px',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'modalStyle',
      backdropClass: 'modalStyleBackdrop',
      disableClose: true,
      autoFocus: false,
    });

    this.breakpointObserver.observe(["(max-width: 700px)"])
      .subscribe((res) => {
        if (res.matches) {
          dialogRef.updateSize('100vw', '100vh');
          dialogRef.removePanelClass('bordered-dialog');
          dialogRef.addPanelClass('no-border-dialog');
        } else {
          dialogRef.updateSize('600px', '660px');
          dialogRef.addPanelClass('bordered-dialog');
          dialogRef.removePanelClass('no-border-dialog');
        }
      })
  }

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '600px',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'modalStyle',
      backdropClass: 'modalStyleBackdrop',
      disableClose: true,
      autoFocus: false,
    });

    this.breakpointObserver.observe(["(max-width: 700px)"])
      .subscribe((res) => {
        if (res.matches) {
          dialogRef.updateSize('100vw', '100vh');
          dialogRef.removePanelClass('bordered-dialog');
          dialogRef.addPanelClass('no-border-dialog');
        } else {
          dialogRef.updateSize('600px', '660px');
          dialogRef.addPanelClass('bordered-dialog');
          dialogRef.removePanelClass('no-border-dialog');
        }
      })
  }
}