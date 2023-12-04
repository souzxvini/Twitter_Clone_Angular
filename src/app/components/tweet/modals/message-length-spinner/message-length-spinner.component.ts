import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-length-spinner',
  templateUrl: './message-length-spinner.component.html',
  styleUrl: './message-length-spinner.component.scss'
})
export class MessageLengthSpinnerComponent {
  @Input() message: string;

  completedColor: string = '#1d9bf0';
  emptyColor: string = '#474747';
  textColor: string = '#e7e9ea';
  progressSpinnerWH = '30px';
  showRemainingCharacters = false;
  remainingCharacters: number = 280;
  maxMessageLength: number = 280;

  constructor(){}

  ngOnChanges(){
    this.adjustProgressSpinner();
  }

  adjustProgressSpinner(){
    if(this.message){

      if(this.message){
        this.completedColor = '#1d9bf0';
        this.progressSpinnerWH = '30px';
        this.showRemainingCharacters = false;
      }

      if(this.message.length > this.maxMessageLength - 21){
        this.showRemainingCharacters = true;
        this.completedColor = '#ffd400';
        this.progressSpinnerWH = '36px';
        this.textColor = '#e7e9ea';
      }

      if(this.message.length >= this.maxMessageLength){
        this.completedColor = '#be212a';
        this.textColor = '#be212a';
      }

      if(this.message.length >= this.maxMessageLength + 10){
        this.completedColor = 'transparent';
        this.emptyColor = 'transparent';
      }
    }

    this.updateStrokeDasharray();
  }

  updateStrokeDasharray() {
    const filled = ((this.maxMessageLength - this.message.length ) / this.maxMessageLength) * 100;
    const remaining = 100 - filled;

    return `${remaining} ${filled}`;
  }

}
