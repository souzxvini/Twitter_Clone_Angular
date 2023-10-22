import { NgModule } from '@angular/core';
import { FollowingButton32pxComponent } from 'src/app/components/following-button-32px/following-button-32px.component';
import { FollowingButton36pxComponent } from 'src/app/components/following-button-36px/following-button-36px.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { WhoToFollowCardComponent } from 'src/app/components/who-to-follow-card/who-to-follow-card.component';
import { CommonModule } from '@angular/common';
import { SearchTwitterButtonComponent } from 'src/app/components/search-twitter-button/search-twitter-button.component';
import { SharedMaterialModule } from '../shared/shared-material/shared-material.module';
import { UnfollowConfirmationModalComponent } from './unfollow-confirmation-modal/unfollow-confirmation-modal.component';
import { TweetComponent } from './tweet/tweet.component';
import { FollowProfileButtonDescriptionComponent } from './follow-profile-button-description/follow-profile-button-description.component';
import { DefaultSearchSectionComponent } from './default-search-section/default-search-section.component';
import { FollowProfileButtonComponent } from './follow-profile-button/follow-profile-button.component';
import { MobileFooterNavComponent } from './mobile-footer-nav/mobile-footer-nav.component';
import { BlockedButton36pxComponent } from './blocked-button-36px/blocked-button-36px.component';
@NgModule({
  declarations:[ 
    FollowingButton32pxComponent,
    FollowingButton36pxComponent,
    BlockedButton36pxComponent,
    FooterComponent,
    WhoToFollowCardComponent,
    SearchTwitterButtonComponent,
    UnfollowConfirmationModalComponent,
    TweetComponent,
    FollowProfileButtonDescriptionComponent,
    DefaultSearchSectionComponent,
    FollowProfileButtonComponent,
    MobileFooterNavComponent,
  ],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [ 
    FollowingButton32pxComponent,
    FollowingButton36pxComponent,
    BlockedButton36pxComponent,
    FooterComponent,
    WhoToFollowCardComponent,
    SearchTwitterButtonComponent,
    UnfollowConfirmationModalComponent,
    TweetComponent,
    FollowProfileButtonDescriptionComponent,
    DefaultSearchSectionComponent,
    MobileFooterNavComponent
  ]
})

export class SharedComponentsModule { }
