import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { MyProfileModel } from 'src/app/models/my-profile-model';
import { FeedService } from 'src/app/services/feed.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

@Component({
  selector: 'app-post-new-tweet-modal',
  templateUrl: './post-new-tweet-modal.component.html',
  styleUrl: './post-new-tweet-modal.component.scss'
})
export class PostNewTweetModalComponent {

  loggedUser: MyProfileModel;

  setProfilePhoto = setProfilePhoto;
  
  loaded = true;

  message: string;

  newTweetForm = new FormGroup<{
    message: FormControl<string>,
    canBeReplied: FormControl<boolean>,
    attachment: FormControl<string>
  }>({
    message: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    canBeReplied: new FormControl(null, Validators.required),
    attachment: new FormControl(null)
  });

  constructor(
    private globalVariablesService: GlobalVariablesService,
    private feedService: FeedService,
    private dialogRef: DialogRef<PostNewTweetModalComponent>
  ){} 

  ngOnInit(){
    this.loggedUser = this.globalVariablesService.getCurrentLoggedUser();
  }

  postNewTweet(){
    this.loaded = false;

    const payload = {
      message: this.newTweetForm.controls['message'].value,
      canBeReplied: true, 
      attachment: null
    }

    this.feedService.newTweet(payload).subscribe({
      complete: () => {
        this.loaded = true;
        this.dialogRef.close();
      },
      error: () => {
        this.loaded = true;
      }
    })
  }

  textAreaHeight: string = 'auto';

  adjustTextarea(event: any): void {
    const textarea: HTMLTextAreaElement = event.target;
    textarea.style.height = 'auto'; // Reset height to recalculate
    textarea.style.height = textarea.scrollHeight + 'px'; // Reset height to recalculate
  }
  
}
