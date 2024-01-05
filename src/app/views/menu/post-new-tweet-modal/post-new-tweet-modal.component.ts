import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { DialogRef } from '@angular/cdk/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { MyProfileModel } from 'src/app/models/my-profile-model';
import { FeedService } from 'src/app/services/feed.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

@Component({
  selector: 'app-post-new-tweet-modal',
  templateUrl: './post-new-tweet-modal.component.html',
  styleUrl: './post-new-tweet-modal.component.scss',
  animations: [
    trigger('fastFadeInOutAnimation', [
      transition(':enter', [
        animate('200ms', keyframes([
          style({ opacity: 0 }),
          style({ opacity: 1 }),
        ]))
      ])
    ]),
    trigger('fadeInOutAnimation', [
      transition(':enter', [
        animate('400ms cubic-bezier(.53,.02,1,.73)', keyframes([
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
    ]),
  ]
})
export class PostNewTweetModalComponent {

  loggedUser: MyProfileModel;

  setProfilePhoto = setProfilePhoto;
  
  loaded = true;

  selectedFiles: any[] = [];
  selectedFilesUrl: any[] = [];

  newTweetForm = new FormGroup<{
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
    private globalVariablesService: GlobalVariablesService,
    private feedService: FeedService,
    private dialogRef: DialogRef<PostNewTweetModalComponent>,
    private snackbar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ){} 

  ngOnInit(){
    this.loggedUser = this.globalVariablesService.getCurrentLoggedUser();
  }

  postNewTweet(){
    this.loaded = false;

    const payload = {
      message: this.newTweetForm.controls['message'].value,
      canBeReplied: this.newTweetForm.controls['canBeReplied'].value, 
      attachment: this.selectedFiles
    }

    this.feedService.newTweet(payload).subscribe({
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

  changeTweetPrivacy(privacy: string){
    this.newTweetForm.controls['canBeReplied'].setValue(privacy);
    this.tweetPermissionPanelState = false;
  }

  adjustTextarea(event: any): void {
    const textarea: HTMLTextAreaElement = event.target;
    textarea.style.height = 'auto'; // Reset height to recalculate
    textarea.style.height = textarea.scrollHeight + 'px'; // Reset height to recalculate
  }
}
