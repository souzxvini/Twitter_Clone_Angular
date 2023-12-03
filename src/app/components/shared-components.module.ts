import { NgModule } from '@angular/core';
import { FollowingButton32pxComponent } from 'src/app/components/following-button-32px/following-button-32px.component';
import { FollowingButton36pxComponent } from 'src/app/components/following-button-36px/following-button-36px.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { WhoToFollowCardComponent } from 'src/app/components/who-to-follow-card/who-to-follow-card.component';
import { CommonModule } from '@angular/common';
import { SearchTwitterButtonComponent } from 'src/app/components/search-twitter-button/search-twitter-button.component';
import { SharedMaterialModule } from '../shared/shared-material/shared-material.module';
import { UnfollowConfirmationModalComponent } from './unfollow-confirmation-modal/unfollow-confirmation-modal.component';
import { FollowProfileButtonDescriptionComponent } from './follow-profile-button-description/follow-profile-button-description.component';
import { DefaultSearchSectionComponent } from './default-search-section/default-search-section.component';
import { FollowProfileButtonComponent } from './follow-profile-button/follow-profile-button.component';
import { MobileFooterNavComponent } from './mobile-footer-nav/mobile-footer-nav.component';
import { BlockedButton36pxComponent } from './blocked-button-36px/blocked-button-36px.component';
import { ModalBlockUserComponent } from './modal-block-user/modal-block-user.component';
import { ModalUnblockUserComponent } from './modal-unblock-user/modal-unblock-user.component';
import { BlockedButton32pxComponent } from './blocked-button-32px/blocked-button-32px.component';
import { ModalClearHistoricComponent } from './search-twitter-button/modal-clear-historic/modal-clear-historic.component';
import { TweetComponent } from './tweet/tweet-types/tweet/tweet.component';
import { RetweetComponent } from './tweet/tweet-types/retweet/retweet.component';
import { NoCommentRetweetComponent } from './tweet/tweet-types/no-comment-retweet/no-comment-retweet.component';
import { CommentComponent } from './tweet/tweet-types/comment/comment.component';
import { TweetTypesComponent } from './tweet/tweet-types/tweet-types.component';
import { PostNewTweetModalComponent } from './../views/menu/post-new-tweet-modal/post-new-tweet-modal.component';
import { NewCommentModalComponent } from './tweet/modals/new-comment-modal/new-comment-modal.component';
import { TweetActionsComponent } from './tweet/tweet-actions/tweet-actions.component';
import { TweetHeaderComponent } from './tweet/tweet-header/tweet-header.component';
import { TweetMessageComponent } from './tweet/tweet-message/tweet-message.component';
import { NewTweetImagesComponent } from './tweet/modals/new-tweet-images/new-tweet-images.component';
import { NewTweetIconsActionsComponent } from './tweet/modals/new-tweet-icons-actions/new-tweet-icons-actions.component';

@NgModule({
  declarations:[ 
    FollowingButton32pxComponent,
    FollowingButton36pxComponent,
    BlockedButton32pxComponent,
    BlockedButton36pxComponent,
    FooterComponent,
    WhoToFollowCardComponent,
    SearchTwitterButtonComponent,
    UnfollowConfirmationModalComponent,
    FollowProfileButtonDescriptionComponent,
    DefaultSearchSectionComponent,
    FollowProfileButtonComponent,
    MobileFooterNavComponent,
    ModalBlockUserComponent,
    ModalUnblockUserComponent,
    ModalClearHistoricComponent,
    TweetTypesComponent,
    TweetComponent,
    RetweetComponent,
    NoCommentRetweetComponent,
    CommentComponent,
    PostNewTweetModalComponent,
    NewCommentModalComponent,
    TweetActionsComponent,
    TweetHeaderComponent,
    TweetMessageComponent,
    NewTweetImagesComponent,
    NewTweetIconsActionsComponent
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
    FollowProfileButtonDescriptionComponent,
    DefaultSearchSectionComponent,
    MobileFooterNavComponent,
    TweetTypesComponent,
    TweetComponent,
    RetweetComponent,
    NoCommentRetweetComponent,
    CommentComponent,
    PostNewTweetModalComponent,
    NewCommentModalComponent,
    TweetActionsComponent,
    TweetHeaderComponent,
    NewTweetImagesComponent,
    NewTweetIconsActionsComponent
  ]
})

export class SharedComponentsModule { }
