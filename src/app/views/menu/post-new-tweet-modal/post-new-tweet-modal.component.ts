import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  selectedFiles: any[] = [];
  selectedFilesUrl: any[] = [];

  constructor(
    private globalVariablesService: GlobalVariablesService,
    private feedService: FeedService,
    private dialogRef: DialogRef<PostNewTweetModalComponent>,
    private snackbar: MatSnackBar
  ){} 

  ngOnInit(){
    this.loggedUser = this.globalVariablesService.getCurrentLoggedUser();
  }

  postNewTweet(){
    this.loaded = false;

    const payload = {
      message: this.newTweetForm.controls['message'].value,
      canBeReplied: true, 
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

  adjustTextarea(event: any): void {
    const textarea: HTMLTextAreaElement = event.target;
    textarea.style.height = 'auto'; // Reset height to recalculate
    textarea.style.height = textarea.scrollHeight + 'px'; // Reset height to recalculate
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
    if(this.selectedFilesUrl.length == 1){
      this.resizeSelectedImage();
    }

    this.selectedFilesUrl.splice(fileIndex, 1);
  } 

  resizeSelectedImage(){
    var img = new Image();
    
    // Define a URL da imagem
    img.src = this.selectedFilesUrl[0];

    // Quando a imagem é carregada, acessa suas dimensões
    img.onload = () => {
        var width = img.width;
        var height = img.height;

        var div = document.getElementById('tweetImage');
        var divWidth = div.offsetWidth; // Get current width of the div
        var aspectRatio = height / width;
        var calculatedHeight = divWidth * aspectRatio;
        div.style.height = calculatedHeight + 'px';
    };

    // Caso a imagem não possa ser carregada
    img.onerror = () => {
        console.log("Não foi possível carregar a imagem.");
    };
  }
  
}
