import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-tweet-icons-actions',
  templateUrl: './new-tweet-icons-actions.component.html',
  styleUrl: './new-tweet-icons-actions.component.scss'
})
export class NewTweetIconsActionsComponent {
  @Input() selectedFilesUrl: any[];
  @Input() selectedFiles: any[];

  constructor(
    private snackbar: MatSnackBar
  ){}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
       const files = Array.from(input.files);
      const reader = new FileReader();

      if(files.length == 1){
        if(this.selectedFilesUrl.length == 0){
          reader.onload = (e) => {
            this.selectedFilesUrl.push(reader.result);
            this.selectedFiles.push(files[0]);
            this.resizeSelectedImage();
          };
          reader.readAsDataURL(files[0]);
        } else if(this.selectedFilesUrl.length > 0 && this.selectedFilesUrl.length < 4){
          reader.onload = (e) => {
            this.selectedFilesUrl.push(reader.result);
            this.selectedFiles.push(files[0]);
          };
          reader.readAsDataURL(files[0]);
          
        }else{
          this.snackbar.open(
            'Escolha até 4 fotos.',
            '',
            { duration: 5000, panelClass: ['snackbarLoginError'] }
          );
        }
      }

      if(files.length > 1){
        if(this.selectedFilesUrl.length + files.length <= 4){
          files.forEach((file, index) => {
            this.selectedFiles.push(file);
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
