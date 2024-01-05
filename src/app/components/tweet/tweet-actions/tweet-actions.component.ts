import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TweetModel } from 'src/app/models/tweet-model';
import { FeedService } from 'src/app/services/feed.service';
import { NewCommentModalComponent } from '../modals/new-comment-modal/new-comment-modal.component';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { NewRetweetCommentModalComponent } from '../modals/new-retweet-comment-modal/new-retweet-comment-modal.component';

@Component({
  selector: 'app-tweet-actions',
  templateUrl: './tweet-actions.component.html',
  styleUrl: './tweet-actions.component.scss',
  animations: [
    trigger('fadeInOutAnimation', [
      transition('void => *', [
        animate(200, keyframes([
          style({ opacity: 0 }),
          style({ opacity: 1 }),
        ]))
      ])
    ])
  ]
})
export class TweetActionsComponent {
  @Input() tweet: TweetModel;

  retweetPanelState = false;
  tweetOptionsPanelState = false;

  constructor(
    private feedService: FeedService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ){}

  likeToggle(tweetIdentifier){
    this.toggleLikeStatus();
    
    this.feedService.likeToggle(tweetIdentifier).subscribe({
      error: () => {
        this.toggleLikeStatus();
      }
    })
  }

  toggleLikeStatus() {
    this.tweet.likedByMe = !this.tweet.likedByMe;
    this.tweet.likedByMe ? this.tweet.tweetLikesCount++ : this.tweet.tweetLikesCount--;
  }

  retweetToggle(tweetIdentifier){
    this.retweetPanelState = !this.retweetPanelState;
    this.toggleRetweetStatus();
    
    this.feedService.retweetToggle(tweetIdentifier).subscribe({
      error: () => {
        this.toggleRetweetStatus();
      }
    })
  }

  toggleRetweetStatus() {
    this.tweet.retweetedByMe = !this.tweet.retweetedByMe;
    this.tweet.retweetedByMe ? this.tweet.tweetRetweetsCount++ : this.tweet.tweetRetweetsCount--;
  }

  favToggle(tweetIdentifier){
    this.toggleFavStatus();
    
    this.feedService.favToggle(tweetIdentifier).subscribe({
      error: () => {
        this.toggleFavStatus();
      }
    })
  }

  toggleFavStatus() {
    //this.tweet.favoritedByMe= !this.tweet.favoritedByMe;
    //this.tweet.favoritedByMe ? this.tweet.tweetFavsCount++ : this.tweet.tweetFavsCount--;
  }

  openNewCommentModal(tweet: TweetModel){
    const dialogRef = this.dialog.open(NewCommentModalComponent, {
      width: '600px',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: ['modalStyle', 'newTweetDialog'],
      backdropClass: 'modalStyleBackdrop',
      disableClose: true,
      autoFocus: false,
      position: { top: '0px' },
      data: tweet
    });

    this.breakpointObserver.observe(["(max-width: 700px)"])
    .subscribe((res) => {
      if (res.matches) {
        dialogRef.updateSize('100vw', '100vh');
        dialogRef.removePanelClass('bordered-dialog');
        dialogRef.removePanelClass('newTweetDialog');
        dialogRef.addPanelClass('no-border-dialog');
      } else {
        dialogRef.updateSize('600px');
        dialogRef.addPanelClass('bordered-dialog');
        dialogRef.addPanelClass('newTweetDialog');
        dialogRef.removePanelClass('no-border-dialog');
      }
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if(res) {
          tweet.tweetCommentsCount++;
        }
      }
    })
  }

  openNewRetweetCommentModal(tweet: TweetModel){
    this.retweetPanelState = !this.retweetPanelState;
    const dialogRef = this.dialog.open(NewRetweetCommentModalComponent, {
      width: '600px',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: ['modalStyle', 'newTweetDialog'],
      backdropClass: 'modalStyleBackdrop',
      disableClose: true,
      autoFocus: false,
      position: { top: '0px' },
      data: tweet
    });

    this.breakpointObserver.observe(["(max-width: 700px)"])
    .subscribe((res) => {
      if (res.matches) {
        dialogRef.updateSize('100vw', '100vh');
        dialogRef.removePanelClass('bordered-dialog');
        dialogRef.removePanelClass('newTweetDialog');
        dialogRef.addPanelClass('no-border-dialog');
      } else {
        dialogRef.updateSize('600px');
        dialogRef.addPanelClass('bordered-dialog');
        dialogRef.addPanelClass('newTweetDialog');
        dialogRef.removePanelClass('no-border-dialog');
      }
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if(res) {
          tweet.tweetCommentsCount++;
        }
      }
    })
  }

}
