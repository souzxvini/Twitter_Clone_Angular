import { ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { StyleRenderer, lyl, ThemeRef, ThemeVariables } from '@alyle/ui';
import {
  ImgCropperConfig,
  ImgCropperEvent,
  LyImageCropper,
  ImgCropperErrorEvent,
  STYLES as CROPPER_STYLES,
  ImgCropperLoaderConfig
} from '@alyle/ui/image-cropper';
import { LySliderChange } from '@alyle/ui/slider';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

const STYLES = (_theme: ThemeVariables, ref: ThemeRef) => {
  ref.renderStyleSheet(CROPPER_STYLES);

  return {
    cropper: lyl `{
      width: 100%
      height: 100%
    }`
  };
};

@Component({
  selector: 'app-edit-background-picture-modal',
  templateUrl: './edit-background-picture-modal.component.html',
  styleUrls: ['./edit-background-picture-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    StyleRenderer
  ]
})
export class EditBackgroundPictureModalComponent {
  @ViewChild('_fileInput') _fileInput!: ElementRef<HTMLInputElement>;

  classes = this.sRenderer.renderSheet(STYLES);
  croppedImage?: any;
  scale: number;
  ready = false;
  minScale: number;
  maxScale: number;
  @ViewChild(LyImageCropper) readonly cropper!: LyImageCropper;
  myConfig: ImgCropperConfig = {
    // autoCrop: true,
    width: 550, // Default `250`
    height: 180, // Default `200`
    fill: '#ff2997', // Default transparent if type == png else #000
    type: 'image/png', // Or you can also use `image/jpeg`
    responsiveArea: true
  };

  constructor(
    private dialogRef: MatDialogRef<EditBackgroundPictureModalComponent>,
    readonly sRenderer: StyleRenderer,
    @Inject(MAT_DIALOG_DATA) public imageUrl: any
  ) { }

  ngAfterViewInit(){
    const config: ImgCropperLoaderConfig = {
      scale: 0.745864772531767,
      rotation: 0,
      originalDataURL: this.imageUrl
    };
    this.cropper.loadImage(config);
  }

  onCropped(e: ImgCropperEvent) {
    this.croppedImage = e;
    console.log(this.croppedImage)
    this.dialogRef.close(this.croppedImage.dataURL)
  }
  onLoaded(e: ImgCropperEvent) {
  }

  onError(e: ImgCropperErrorEvent) {
  }
  
  onSliderInput(event: LySliderChange) {
    this.scale = event.value as number ;
  }

}
