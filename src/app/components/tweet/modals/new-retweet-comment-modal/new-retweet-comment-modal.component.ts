import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { DialogRef, } from '@angular/cdk/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { showTweetTime } from 'src/app/helpers/show-tweet-time';
import { MyProfileModel } from 'src/app/models/my-profile-model';
import { TweetModel } from 'src/app/models/tweet-model';
import { FeedService } from 'src/app/services/feed.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

@Component({
  selector: 'app-new-retweet-comment-modal',
  templateUrl: './new-retweet-comment-modal.component.html',
  styleUrl: './new-retweet-comment-modal.component.scss',
  animations: [
    trigger('fastFadeInAnimation', [
      transition(':enter', [
        animate('200ms', keyframes([
          style({ opacity: 0 }),
          style({ opacity: 1 }),
        ]))
      ])
    ]),
    trigger('fastFadeOutAnimation', [
      transition(':leave', [
        animate('200ms', keyframes([
          style({ opacity: 1 }),
          style({ opacity: 0 }),
        ]))
      ])
    ]),
    trigger('zoomIn', [
      transition(':enter', [
        style({ transform: 'scale(0.5)' }),
        animate('{{time}} cubic-bezier(0,.87,.61,.98)', style({ transform: 'scale(1)' })),
      ], { params: { time: '400ms' } }),
    ]),
  ]
})
export class NewRetweetCommentModalComponent {
  loggedUser: MyProfileModel;

  setProfilePhoto = setProfilePhoto;
  showTweetTime = showTweetTime;
  
  loaded = true;

  selectedFiles: any[] = [];
  selectedFilesUrl: any[] = [];

  newRetweetCommentForm = new FormGroup<{
    message: FormControl<string>,
    canBeReplied: FormControl<string>,
  }>({
    message: new FormControl(null, [Validators.maxLength(280)]),
    canBeReplied: new FormControl('1', Validators.required)
  });

  tweetPermissionPanelState = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(["(max-width: 498px)"])
  .pipe(map((result) => result.matches));

  constructor(
    @Inject(MAT_DIALOG_DATA) public originalTweet: TweetModel,
    private globalVariablesService: GlobalVariablesService,
    private breakpointObserver: BreakpointObserver,
    private feedService: FeedService,
    private dialogRef: MatDialogRef<NewRetweetCommentModalComponent>,
    private snackbar: MatSnackBar
  ){}

  ngOnInit(){
    this.loggedUser = this.globalVariablesService.getCurrentLoggedUser();
  }

  postCommentedRetweet(originalTweetIdentifier){
    const payload = {
      message: this.newRetweetCommentForm.controls['message'].value,
      attachment: this.selectedFiles
    }

    this.feedService.retweetToggle(originalTweetIdentifier, payload).subscribe({
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
      }
    })
  }

  changeTweetPrivacy(privacy: string){
    this.newRetweetCommentForm.controls['canBeReplied'].setValue(privacy);
    this.tweetPermissionPanelState = false;
  }

  adjustTextarea(event: any): void {
    const textarea: HTMLTextAreaElement = event.target;
    textarea.style.height = 'auto'; // Reset height to recalculate
    textarea.style.height = textarea.scrollHeight + 'px'; // Reset height to recalculate
  }

}
