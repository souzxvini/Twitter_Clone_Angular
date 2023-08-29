import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import * as moment from 'moment';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss']
})
export class CreateAccountModalComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('emailInput') emailInput: ElementRef;
  @ViewChild('monthInput') monthInput: MatSelect;

  step: number = 1;
  selectDays = []
  selectYears = []

  registerForm = new FormGroup<{
    firstName: FormControl<string>,
    email: FormControl<string>,
    birthDateDay: FormControl<number>,
    birthDateMonth: FormControl<number>,
    birthDateYear: FormControl<number>,
  }>({
    firstName: new FormControl('Vinicius Souza',  [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('vnsoliveira2512@gmail.com', [Validators.required, Validators.email]),
    birthDateDay: new FormControl(25 , Validators.required),
    birthDateMonth: new FormControl(12 , Validators.required),
    birthDateYear: new FormControl(2001 , Validators.required),
  });

  birthDate: string;

  constructor(
    public dialogRef: MatDialogRef<CreateAccountModalComponent>
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
  }

  advance() {
    const day = this.registerForm.controls['birthDateDay'].value;
    const month = this.registerForm.controls['birthDateMonth'].value;
    const year = this.registerForm.controls['birthDateYear'].value;
    this.birthDate = moment(new Date(year + '-' + month + '-' + day)).format('DD/MM/YYYY');
    this.step++;

  }

  closeDialog() {
    this.dialogRef.close();
  }


}
