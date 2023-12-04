import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { MyProfileModel } from 'src/app/models/my-profile-model';
import { TweetModel } from 'src/app/models/tweet-model';
import { FeedService } from 'src/app/services/feed.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

@Component({
  selector: 'app-new-comment-modal',
  templateUrl: './new-comment-modal.component.html',
  styleUrl: './new-comment-modal.component.scss'
})
export class NewCommentModalComponent {

  loggedUser: MyProfileModel;

  setProfilePhoto = setProfilePhoto;
  
  loaded = true;

  selectedFiles: any[] = [];
  selectedFilesUrl: any[] = [];

  newCommentForm = new FormGroup<{
    message: FormControl<string>
  }>({
    message: new FormControl(null, [Validators.maxLength(280)])
  });

  completedColor: string = '#1d9bf0';
  emptyColor: string = '#474747';
  textColor: string = '#e7e9ea';
  progressSpinnerWH = '30px';
  showRemainingCharacters = false;
  remainingCharacters: number = 280;
  maxMessageLength: number = 280;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TweetModel,
    private dialogRef: MatDialogRef<NewCommentModalComponent>,
    private globalVariablesService: GlobalVariablesService,
    private snackbar: MatSnackBar,
    private feedService: FeedService
  ){
    this.loggedUser = this.globalVariablesService.getCurrentLoggedUser();
  }

  postComment(){
    this.loaded = false;

    const payload = {
      message: this.newCommentForm.controls['message'].value,
      attachment: this.selectedFiles
    }

    this.feedService.newComment(payload, this.data.tweetIdentifier).subscribe({
      complete: () => {
        this.loaded = true;
        this.dialogRef.close();

        this.snackbar.open(
          'Seu post foi enviado.',
          'Ver',
          { duration: 5000, panelClass: ['snackbarLoginError'] }
        );
        this.dialogRef.close(true);
      },
      error: () => {
        this.loaded = true;
      }
    })
  }

  adjustTextarea(event: any): void {
    this.adjustTextareaHeight(event);
    this.adjustProgressSpinner();
  }

  adjustTextareaHeight(event){
    const textarea: HTMLTextAreaElement = event.target;
    textarea.style.height = 'auto'; // Reset height to recalculate
    textarea.style.height = textarea.scrollHeight + 'px'; // Reset height to recalculate
  }

  adjustProgressSpinner(){
    if(this.newCommentForm.controls['message'].value){

      if(this.newCommentForm.controls['message'].value){
        this.completedColor = '#1d9bf0';
        this.progressSpinnerWH = '30px';
        this.showRemainingCharacters = false;
      }

      if(this.newCommentForm.controls['message'].value.length > this.maxMessageLength - 21){
        this.showRemainingCharacters = true;
        this.completedColor = '#ffd400';
        this.progressSpinnerWH = '36px';
        this.textColor = '#e7e9ea';
      }

      if(this.newCommentForm.controls['message'].value.length >= this.maxMessageLength){
        this.completedColor = '#be212a';
        this.textColor = '#be212a';
      }

      if(this.newCommentForm.controls['message'].value.length >= this.maxMessageLength + 10){
        this.completedColor = 'transparent';
        this.emptyColor = 'transparent';
      }
    }

    this.updateStrokeDasharray();
  }

  updateStrokeDasharray() {
    const filled = ((this.maxMessageLength - this.newCommentForm.controls['message'].value.length ) / this.maxMessageLength) * 100;
    const remaining = 100 - filled;

    return `${remaining} ${filled}`;
  }

}
