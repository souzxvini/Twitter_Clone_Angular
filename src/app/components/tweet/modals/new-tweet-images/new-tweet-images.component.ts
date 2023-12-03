import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-new-tweet-images',
  templateUrl: './new-tweet-images.component.html',
  styleUrl: './new-tweet-images.component.scss'
})
export class NewTweetImagesComponent {

  @Input() selectedFilesUrl: any[];
  @Input() selectedFiles: any[];

  constructor(){}

  deselectFile(fileIndex){
    console.log('this.selectedFilesUrl')
    console.log(this.selectedFilesUrl)
    console.log('this.selectedFiles')
    console.log(this.selectedFiles)
    this.selectedFilesUrl.splice(fileIndex, 1);
    this.selectedFiles.splice(fileIndex, 1);

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
