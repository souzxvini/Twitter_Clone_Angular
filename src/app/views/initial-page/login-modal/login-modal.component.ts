import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CreateAccountModalComponent } from '../create-account-modal/create-account-modal.component';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {

  firstStepLogin = true;
  registerModal = false;
  hide = true;

  loginForm = new FormGroup<{
    username: FormControl<string>,
    password: FormControl<string>,
  }>({
    username: new FormControl(null),
    password: new FormControl(null)
  });

  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) { }

  verifyIfUsernameExists() {
    this.firstStepLogin = false;
    this.loginForm.controls['password'].setValidators(Validators.required);
    this.loginForm.controls['password'].updateValueAndValidity();
    this.loginForm.controls['username'].disable();
  }

  login() {
    const payload = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    }
    this.authService.authenticate(payload).subscribe({
      next: () => {
        this.dialogRef.close();
        this.router.navigate(['/home']);
      },
      error: () => {
        this.snackbar.open(
          'Senha incorreta.',
          '',
          { duration: 5000, panelClass: ['snackbarLoginError'] }
        );
      }
    })
  }

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

      this.dialogRef.close();
  }
}
