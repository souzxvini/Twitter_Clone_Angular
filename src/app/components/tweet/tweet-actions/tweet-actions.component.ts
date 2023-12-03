import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TweetModel } from 'src/app/models/tweet-model';
import { FeedService } from 'src/app/services/feed.service';
import { NewCommentModalComponent } from '../modals/new-comment-modal/new-comment-modal.component';

@Component({
  selector: 'app-tweet-actions',
  templateUrl: './tweet-actions.component.html',
  styleUrl: './tweet-actions.component.scss'
})
export class TweetActionsComponent {
  @Input() tweet: TweetModel;

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
    /*this.tweet.retweetedByMe = !this.tweet.retweetedByMe;
    this.tweet.retweetedByMe ? this.tweet.tweetRetweetsCount++ : this.tweet.tweetRetweetsCount--;
    
    this.feedService.favToggle(tweetIdentifier).subscribe({
      error: () => {
        this.tweet.retweetedByMe = !this.tweet.retweetedByMe;
        this.tweet.retweetedByMe ? this.tweet.tweetRetweetsCount++ : this.tweet.tweetRetweetsCount--;
      }
    })*/
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


}
