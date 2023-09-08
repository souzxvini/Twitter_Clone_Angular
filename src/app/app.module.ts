import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/home/home.component';
import { MenuComponent } from './views/menu/menu.component';
import { HomeSearchComponent } from './views/home/home-search/home-search.component';
import { WhoToFollowCardComponent } from './components/who-to-follow-card/who-to-follow-card.component';
import { MobileFooterNavComponent } from './components/mobile-footer-nav/mobile-footer-nav.component';
import { SearchTwitterButtonComponent } from './components/search-twitter-button/search-twitter-button.component';
import { FooterComponent } from './components/footer/footer.component';
import { InitialPageComponent } from './views/initial-page/initial-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedMaterialModule } from './shared/shared-material/shared-material.module';
import { CreateAccountModalComponent } from './views/initial-page/create-account-modal/create-account-modal.component';
import { DidNotReceiveEmailModalComponent } from './views/initial-page/create-account-modal/did-not-receive-email-modal/did-not-receive-email-modal.component';
import { EditProfilePictureModalComponent } from './components/edit-profile-picture-modal/edit-profile-picture-modal.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LySliderModule } from '@alyle/ui/slider';

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
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    HomeSearchComponent,
    WhoToFollowCardComponent,
    MobileFooterNavComponent,
    SearchTwitterButtonComponent,
    FooterComponent,
    InitialPageComponent,
    CreateAccountModalComponent,
    DidNotReceiveEmailModalComponent,
    EditProfilePictureModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedMaterialModule,
    ImageCropperModule,
    HammerModule,
    LyImageCropperModule,
    LyButtonModule,
    LyIconModule,
    LySliderModule
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
