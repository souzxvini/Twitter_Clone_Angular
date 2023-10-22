import { Component, DestroyRef, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EditProfilePictureModalComponent } from 'src/app/components/edit-profile-picture-modal/edit-profile-picture-modal.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AccountsService } from 'src/app/services/accounts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { noProfilePicture } from 'src/app/helpers/no-profile-picture';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss']
})
export class CreateAccountModalComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('emailInput') emailInput: ElementRef;
  @ViewChild('monthInput') monthInput: MatSelect;
  @ViewChild('selectFileButton') selectFileButton!: ElementRef<HTMLInputElement>;

  loaded = true;
  step: number = 1;
  selectDays = []
  selectYears = []

  registerForm = new FormGroup<{
    firstName: FormControl<string>,
    email: FormControl<string>,
    birthDateDay: FormControl<number>,
    birthDateMonth: FormControl<number>,
    birthDateYear: FormControl<number>,
    password: FormControl<string>,
    confirmationCode: FormControl<string>,
  }>({
    firstName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    birthDateDay: new FormControl(null, Validators.required),
    birthDateMonth: new FormControl(null, Validators.required),
    birthDateYear: new FormControl(null, Validators.required),
    password: new FormControl(null),
    confirmationCode: new FormControl(null)
  });

  usernameForm = new FormGroup<{
    username: FormControl<string>,
  }>({
    username: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)])
  });

  birthDate: string;

  hide = true;
  url: any;

  suggestedProfiles: any[] = [];

  noProfilePicture = noProfilePicture;
  setProfilePhoto = setProfilePhoto;

  constructor(
    public dialogRef: MatDialogRef<CreateAccountModalComponent>,
    private router: Router,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private accountsService: AccountsService,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.fillSelectsOptions();

    this.registerForm.controls['email'].valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(200)).subscribe((value) => {
        this.accountsService.isValidEmail(value).subscribe({
          next: (res) => {
            if (!res.validEmail) {
              this.registerForm.controls['email'].setErrors({ existentEmail: true })
            }
          }
        })
      })
  }

  fillSelectsOptions() {
    let day = 1;
    while (day <= 31) {
      this.selectDays.push(day)
      day++;
    }

    const currentDate = new Date();
    let year = currentDate.getFullYear();
    let minimunYear = year - 120
    while (year >= minimunYear) {
      this.selectYears.push(year)
      year--;
    }
  }

  redirectFocus(input) {
    this.step--;
    setTimeout(() => {
      input != 'monthInput' ? this[input].nativeElement.focus() : this.monthInput.focus();
    }, 0);
  }

  back() {
    this.step--;

    if (this.step == 2) {
      this.registerForm.controls['confirmationCode'].clearValidators();
      this.registerForm.controls['confirmationCode'].updateValueAndValidity();
    }
  }

  advance() {
    this.step++;

    if (this.step == 2) {
      const day = this.registerForm.controls['birthDateDay'].value;
      const month = this.registerForm.controls['birthDateMonth'].value;
      const year = this.registerForm.controls['birthDateYear'].value;
      this.birthDate = moment.utc(new Date(year + '-' + month + '-' + day)).format('L');
    }

  }

  sendConfirmationCode() {
    this.loaded = false;

    this.accountsService.sendConfirmationCode(this.registerForm.controls['email'].value).subscribe({
      complete: () => {
        this.loaded = true;
        this.step++;

        this.registerForm.controls['confirmationCode'].setValidators([Validators.required]);
        this.registerForm.controls['confirmationCode'].updateValueAndValidity();
      },
      error: () => {
        this.loaded = true;
        this.snackbar.open(
          'Erro enviar o código de confirmação. Por favor, tente novamente.',
          '',
          { duration: 5000, panelClass: ['snackbarLoginError'] }
        );
      }
    })

  }

  confirmCode() {
    this.loaded = false;

    const payload = {
      email: this.registerForm.controls['email'].value,
      code: this.registerForm.controls['confirmationCode'].value
    }

    this.accountsService.confirmCode(payload).subscribe({
      complete: () => {
        this.loaded = true;
        this.step++;

        this.registerForm.controls['password'].setValidators([Validators.required, Validators.minLength(8)]);
        this.registerForm.controls['password'].updateValueAndValidity();
      },
      error: () => {
        this.loaded = true;
        this.snackbar.open(
          'O código inserido está incorreto. Tente novamente.',
          '',
          { duration: 5000, panelClass: ['snackbarLoginError'] }
        );
      }
    })

  }

  createprofile() {
    this.loaded = false;

    const payload = {
      firstName: this.registerForm.controls['firstName'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
      birthDate: moment.utc(new Date(this.birthDate)).format('YYYY-MM-DD'),
      confirmationCode: this.registerForm.controls['confirmationCode'].value
    }

    this.accountsService.registerUser(payload).subscribe({
      complete: () => {
        const payload = {
          username: this.registerForm.controls['email'].value,
          password: this.registerForm.controls['password'].value
        }
        this.authService.authenticate(payload).subscribe({
          next: () => {
            this.loaded = true;
            this.step++;
            this.router.navigate(['signup']);
            this.accountsService.updateFirstAcess().subscribe();
            this.usernameForm.controls['username'].setValue(localStorage.getItem('userName'));
          }
        })
      },
      error: () => {
        this.loaded = true;
        this.snackbar.open(
          'Desculpe. Houve um erro ao criar a sua conta.',
          '',
          { duration: 5000, panelClass: ['snackbarLoginError'] }
        );
      }
    })

  }

  openFileInput() {
    this.selectFileButton.nativeElement.click();
  }

  onSelectFile(event: any): void {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        const dialogRef = this.dialog.open(EditProfilePictureModalComponent, {
          width: '100%',
          maxWidth: '100vw',
          maxHeight: '100vh',
          panelClass: 'modalStyle',
          backdropClass: 'transparentModalStyleBackdrop',
          disableClose: true,
          autoFocus: false,
          data: e.target.result
        });

        dialogRef.afterClosed().subscribe(imgUrl => {
          if (imgUrl) {
            this.url = imgUrl;
          }
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

        this.selectFileButton.nativeElement.value = ''
      }
    }
  }

  saveProfilePicture() {
    this.loaded = false;

    this.accountsService.updateProfilePhoto(this.url).subscribe({
      complete: () => {
        this.loaded = true;
        this.step++;
      },
      error: () => {
        this.loaded = true;
        this.snackbar.open(
          'Desculpe. Houve um erro ao salvar a sua foto de perfil.',
          '',
          { duration: 5000, panelClass: ['snackbarLoginError'] }
        );
      }
    })

  }

  patchUsername() {
    this.loaded = false;

    this.accountsService.updateUsername(this.usernameForm.controls['username'].value).subscribe({
      complete: () => {
        this.loaded = true;
        this.step++;

        this.loadVerifiedUsers();
      },
      error: () => {
        this.loaded = true;
        this.snackbar.open(
          'Desculpe. Houve um erro ao definir o seu nome de usuário.',
          '',
          { duration: 5000, panelClass: ['snackbarLoginError'] }
        );
      }
    })
  }

  loadVerifiedUsers() {
    this.loaded = false;

    this.accountsService.getVerifiedUsers().subscribe({
      next: (res) => {
        this.loaded = true;
        this.suggestedProfiles = res;
      },
      error: () => {
        this.loaded = true;
      }
    })
  }

  finalizeRegistration() {
    this.dialogRef.close();
    this.router.navigate(['/home'])
  }

  closeDialog() {
    this.dialogRef.close();
  }

  isFollowingAtLeast1Account() {
    return this.suggestedProfiles.find(p => p.isFollowedByMe == true);
  }

}
