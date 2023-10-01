import { NgModule } from '@angular/core';
import { FollowingButtonComponent } from 'src/app/components/following-button/following-button.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { WhoToFollowCardComponent } from 'src/app/components/who-to-follow-card/who-to-follow-card.component';
import { CommonModule } from '@angular/common';
import { SearchTwitterButtonComponent } from 'src/app/components/search-twitter-button/search-twitter-button.component';
import { SharedMaterialModule } from '../shared/shared-material/shared-material.module';
import { UnfollowConfirmationModalComponent } from './unfollow-confirmation-modal/unfollow-confirmation-modal.component';
import { TweetComponent } from './tweet/tweet.component';
import { FollowProfileButtonComponent } from './follow-profile-button/follow-profile-button.component';
import { FollowProfileButtonDescriptionComponent } from './follow-profile-button-description/follow-profile-button-description.component';
@NgModule({
  declarations:[ 
    FollowingButtonComponent,
    FooterComponent,
    WhoToFollowCardComponent,
    SearchTwitterButtonComponent,
    UnfollowConfirmationModalComponent,
    TweetComponent,
    FollowProfileButtonComponent,
    FollowProfileButtonDescriptionComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [ 
    FollowingButtonComponent,
    FooterComponent,
    WhoToFollowCardComponent,
    SearchTwitterButtonComponent,
    UnfollowConfirmationModalComponent,
    TweetComponent,
    FollowProfileButtonComponent,
    FollowProfileButtonDescriptionComponent

  ]
})

export class SharedComponentsModule { }
