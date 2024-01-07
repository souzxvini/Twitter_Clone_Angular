import { animate, keyframes, sequence, style, transition, trigger } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { showTweetTime } from 'src/app/helpers/show-tweet-time';
import { MyProfileModel } from 'src/app/models/my-profile-model';
import { TweetModel } from 'src/app/models/tweet-model';
import { FeedService } from 'src/app/services/feed.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

@Component({
  selector: 'app-new-comment-modal',
  templateUrl: './new-comment-modal.component.html',
  styleUrl: './new-comment-modal.component.scss',
  animations: [
    trigger('fastFadeInOutAnimation', [
      transition(':enter', [
        animate('200ms cubic-bezier(.53,.02,1,.73)', keyframes([
          style({ opacity: 0 }),
          style({ opacity: 1 }),
        ]))
      ])
    ]),
    trigger('zoomIn', [
      transition(':enter', [
        style({ transform: 'scale(0.5)' }),
        animate('{{time}} cubic-bezier(0,.87,.61,.98)', style({ transform: 'scale(1)' })),
      ], { params: { time: '400ms' } }),
    ])
    /*trigger('slideInLeftToRigth', [
      transition(':enter', [
        style({ transform: 'translateX(-300px)' }),
        animate('400ms cubic-bezier(0,.87,.61,.98)', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('slideInRightToLeft', [
      transition(':enter', [
        style({ transform: 'translateX(300px)' }),
        animate('400ms cubic-bezier(0,.87,.61,.98)', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('bounce', [
      transition(':enter', [
        sequence([
          style({ transform: 'translateY(0)'}),
          animate("200ms cubic-bezier(0,0,0,1)", style({ transform: 'translateY(-14px)' })),
          animate("300ms cubic-bezier(1,0,1,1)", style({ transform: 'translateY(0)' })),
          animate("200ms cubic-bezier(0,0,0,1)", style({ transform: 'translateY(-10px)' })),
          animate("150ms cubic-bezier(1,0,1,1)", style({ transform: 'translateY(0)' })),
          animate("100ms cubic-bezier(0,0,0,1)", style({ transform: 'translateY(-5px)' })),
          animate("80ms cubic-bezier(1,0,1,1)", style({ transform: 'translateY(0)' })),
        ]),
      ])
    ]),*/
  ]
})
export class NewCommentModalComponent {

  loggedUser: MyProfileModel;

  setProfilePhoto = setProfilePhoto;
  showTweetTime = showTweetTime;
  
  loaded = true;

  selectedFiles: any[] = [];
  selectedFilesUrl: any[] = [];

  newCommentForm = new FormGroup<{
    message: FormControl<string>
  }>({
    message: new FormControl(null, [Validators.maxLength(280)])
  });

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
        this.loggedUser.tweetsCount++;
        this.globalVariablesService.updateMyProfileInfos(this.loggedUser);
        this.loaded = true;
        this.snackbar.open(
          'Seu post foi enviado.',
          'Ver',
          { duration: 5000, panelClass: ['snackbarLoginError'] }
        );
        this.dialogRef.close();
      },
      error: () => {
        this.loaded = true;
      }
    })
  }

  adjustTextarea(event: any): void {
    this.adjustTextareaHeight(event);
  }

  adjustTextareaHeight(event){
    const textarea: HTMLTextAreaElement = event.target;
    textarea.style.height = 'auto'; // Reset height to recalculate
    textarea.style.height = textarea.scrollHeight + 'px'; // Reset height to recalculate
  }

}
