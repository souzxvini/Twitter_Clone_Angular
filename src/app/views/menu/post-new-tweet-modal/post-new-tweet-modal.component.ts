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
  styleUrl: './post-new-tweet-modal.component.scss'
})
export class PostNewTweetModalComponent {

  loggedUser: MyProfileModel;

  setProfilePhoto = setProfilePhoto;
  
  loaded = true;

  selectedFiles: any[] = [];
  selectedFilesUrl: any[] = [];

  completedColor: string = '#1d9bf0';
  emptyColor: string = '#474747';
  textColor: string = '#e7e9ea';
  progressSpinnerWH = '30px';
  showRemainingCharacters = false;
  remainingCharacters: number = 280;
  maxMessageLength: number = 280;

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
    this.adjustTextareaHeight(event);
    this.adjustProgressSpinner();
  }

  adjustTextareaHeight(event){
    const textarea: HTMLTextAreaElement = event.target;
    textarea.style.height = 'auto'; // Reset height to recalculate
    textarea.style.height = textarea.scrollHeight + 'px'; // Reset height to recalculate
  }

  adjustProgressSpinner(){
    if(this.newTweetForm.controls['message'].value){

      if(this.newTweetForm.controls['message'].value){
        this.completedColor = '#1d9bf0';
        this.progressSpinnerWH = '30px';
        this.showRemainingCharacters = false;
      }

      if(this.newTweetForm.controls['message'].value.length > this.maxMessageLength - 21){
        this.showRemainingCharacters = true;
        this.completedColor = '#ffd400';
        this.progressSpinnerWH = '36px';
        this.textColor = '#e7e9ea';
      }

      if(this.newTweetForm.controls['message'].value.length >= this.maxMessageLength){
        this.completedColor = '#be212a';
        this.textColor = '#be212a';
      }

      if(this.newTweetForm.controls['message'].value.length >= this.maxMessageLength + 10){
        this.completedColor = 'transparent';
        this.emptyColor = 'transparent';
      }
    }

    this.updateStrokeDasharray();
  }

  updateStrokeDasharray() {
    const filled = ((this.maxMessageLength - this.newTweetForm.controls['message'].value.length ) / this.maxMessageLength) * 100;
    const remaining = 100 - filled;

    return `${remaining} ${filled}`;
}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFiles = Array.from(input.files);
      const reader = new FileReader();

      if(this.selectedFiles.length == 1){
        if(this.selectedFilesUrl.length < 4){
          reader.onload = (e) => {
            this.selectedFilesUrl.push(reader.result);
            this.resizeSelectedImage();
          };
          reader.readAsDataURL(this.selectedFiles[0]);
        }else{
          this.snackbar.open(
            'Escolha até 4 fotos.',
            '',
            { duration: 5000, panelClass: ['snackbarLoginError'] }
          );
        }
      }

      if(this.selectedFiles.length > 1){
        if(this.selectedFilesUrl.length + this.selectedFiles.length <= 4){
          this.selectedFiles.forEach((file, index) => {
            const reader = new FileReader();
    
            reader.onload = (e) => {
              this.selectedFilesUrl.push(reader.result);
            };
    
            reader.readAsDataURL(file);
          });
        }else{
          this.snackbar.open(
            'Escolha até 4 fotos.',
            '',
            { duration: 5000, panelClass: ['snackbarLoginError'] }
          );
        }
      }
    }
  }

  deselectFile(fileIndex){
    this.selectedFilesUrl.splice(fileIndex, 1);

    if(this.selectedFilesUrl.length == 1){
      this.resizeSelectedImage();
    }
  } 

  resizeSelectedImage(){
    var img = new Image();
    
    img.src = this.selectedFilesUrl[0];

    img.onload = () => {
        var width = img.width;
        var height = img.height;

        var div = document.getElementById('tweetImage');
        var divWidth = div.offsetWidth;
        var aspectRatio = height / width;
        var calculatedHeight = divWidth * aspectRatio;
        div.style.height = calculatedHeight + 'px';
    };
  }

  
  
}
