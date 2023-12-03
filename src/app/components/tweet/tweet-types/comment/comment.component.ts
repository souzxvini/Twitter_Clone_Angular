import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';
import { TweetModel } from 'src/app/models/tweet-model';
import { FeedService } from 'src/app/services/feed.service';
import { NewCommentModalComponent } from '../../modals/new-comment-modal/new-comment-modal.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  @Input() tweet: TweetModel;

  setProfilePhoto = setProfilePhoto;

  constructor(
    private router: Router
  ){}

  redirectToProfile(username){
    this.router.navigate(['profile', username])
  }

  transformByteToImage(imageBytes){
    const base64Data = imageBytes; // Assuming this is your byte array encoded in Base64
    const imageSrc = 'data:image/jpeg;base64,' + base64Data;
    return imageSrc;
  }

}
