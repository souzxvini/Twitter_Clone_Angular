import { NgModule } from '@angular/core';

import { HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
/** Alyle UI */
import {
  LyTheme2,
  StyleRenderer,
  LY_THEME,
  LY_THEME_NAME,
  LY_THEME_GLOBAL_VARIABLES,
  LyHammerGestureConfig
} from '@alyle/ui';
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';
import { color } from '@alyle/ui/color';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { LyButtonModule } from '@alyle/ui/button';
import { LyIconModule } from '@alyle/ui/icon';
import { LySliderModule } from '@alyle/ui/slider';


export class GlobalVariables {
  testVal = color(0x00bcd4);
  Quepal = {
    default: `linear-gradient(135deg,#11998e 0%,#38ef7d 100%)`,
    contrast: color(0xffffff),
    shadow: color(0x11998e)
  };
  SublimeLight = {
    default: `linear-gradient(135deg,#FC5C7D 0%,#6A82FB 100%)`,
    contrast: color(0xffffff),
    shadow: color(0xB36FBC)
  };
  Amber = {
    default: color(0xffc107),
    contrast: color(0, 0, 0, 0.87)
  };
}

@NgModule({
  imports: [
    LyImageCropperModule,
    LyButtonModule,
    LyIconModule,
    LySliderModule,
    HammerModule
  ],
  exports: [
    LyImageCropperModule,
    LyButtonModule,
    LyIconModule,
    LySliderModule,
    HammerModule
  ],
  providers: [
    [ LyTheme2 ],
    [ StyleRenderer ],
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    {
      provide: LY_THEME,
      useClass: MinimaLight,
      multi: true
    },
    {
      provide: LY_THEME,
      useClass: MinimaDark,
      multi: true
    },
    {
      provide: LY_THEME_GLOBAL_VARIABLES,
      useClass: GlobalVariables
    }, // global variables
    // Gestures
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig }
  ]
})

export class AlyleModule { }
