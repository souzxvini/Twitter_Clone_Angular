import { NgModule } from '@angular/core';
import { FollowingButtonComponent } from 'src/app/components/following-button/following-button.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { WhoToFollowCardComponent } from 'src/app/components/who-to-follow-card/who-to-follow-card.component';
import { CommonModule } from '@angular/common';
import { SearchTwitterButtonComponent } from 'src/app/components/search-twitter-button/search-twitter-button.component';
import { SharedMaterialModule } from '../shared/shared-material/shared-material.module';
import { UnfollowConfirmationModalComponent } from './unfollow-confirmation-modal/unfollow-confirmation-modal.component';
import { TweetComponent } from './tweet/tweet.component';
@NgModule({
  declarations:[ 
    FollowingButtonComponent,
    FooterComponent,
    WhoToFollowCardComponent,
    SearchTwitterButtonComponent,
    UnfollowConfirmationModalComponent,
    TweetComponent
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
    TweetComponent
  ]
})

export class SharedComponentsModule { }
