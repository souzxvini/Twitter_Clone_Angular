import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DidNotReceiveEmailModalComponent } from './did-not-receive-email-modal/did-not-receive-email-modal.component';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { EditProfilePictureModalComponent } from 'src/app/components/edit-profile-picture-modal/edit-profile-picture-modal.component';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss']
})
export class CreateAccountModalComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('emailInput') emailInput: ElementRef;
  @ViewChild('monthInput') monthInput: MatSelect;
  @ViewChild('selectFileButton') selectFileButton!: ElementRef<HTMLInputElement>;

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
    firstName: new FormControl("vinicius", [Validators.required, Validators.maxLength(50)]),
    email: new FormControl("vnsoliveira@gmail.com", [Validators.required, Validators.email]),
    birthDateDay: new FormControl(25, Validators.required),
    birthDateMonth: new FormControl(12, Validators.required),
    birthDateYear: new FormControl(2001, Validators.required),
    password: new FormControl(null),
    confirmationCode: new FormControl(null)
  });

  birthDate: string;

  hide = true;
  url: any;
  noProfilePicture = '../../../../assets/img/default-profile-background.png';

  constructor(
    public dialogRef: MatDialogRef<CreateAccountModalComponent>,
    private router: Router,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.fillSelectsOptions();
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
      this.birthDate = moment(new Date(year + '-' + month + '-' + day)).format('DD/MM/YYYY');
    }

  }

  sendConfirmationCode() {
    this.step++;

    //service

    this.registerForm.controls['confirmationCode'].setValidators([Validators.required]);
    this.registerForm.controls['confirmationCode'].updateValueAndValidity();
  }

  resendConfirmationCode() {
    this.dialog.open(DidNotReceiveEmailModalComponent, {
      minWidth: '0px',
      minHeight: '0px',
      panelClass: 'transparentModalStyle',
      backdropClass: 'transparentModalStyleBackdrop',
      disableClose: false,
      autoFocus: false
    });
  }

  confirmCode() {
    this.step++;
    this.registerForm.controls['password'].setValidators([Validators.required, Validators.minLength(8)]);
    this.registerForm.controls['password'].updateValueAndValidity();
  }

  createAccount() {
    this.step++;
    this.router.navigate(['signup'])
  }

  openFileInput() {
    this.selectFileButton.nativeElement.click();
  }

  onSelectFile(event: any): void {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e:any)=> {
        const dialogRef = this.dialog.open(EditProfilePictureModalComponent, {
          width: '600px',
          minHeight: '660px',
          maxHeight:'660px',
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

       this.selectFileButton.nativeElement.value = ''
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
