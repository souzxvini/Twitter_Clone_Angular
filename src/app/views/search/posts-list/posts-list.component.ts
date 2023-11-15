import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent {

  loaded = false;

  tweetsList: any[] = [];

  page = 0;
  size = 15;
  noMoreContent = false;
  loadingMoreContent = false;

  searchvalue = this.activatedRoute.snapshot.params['searchvalue'];

  section: string;

  constructor(
    private feedService: FeedService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.verifySelectedTab();
  }

  verifySelectedTab(){
    if (this.router.url.includes('recent')) {
      this.section = 'recent';
      this.getTweets('LATTER');
    }
    else if (this.router.url.includes('peoples')) {
      this.section = 'peoples';
      //this.getTweets('LATTER');
    }
    else if (this.router.url.includes('medias')) {
      this.section = 'medias';
      this.getTweets('MEDIA');
    }
    else{
      this.section = 'MAIN';
      this.getTweets('MAIN');
    }
  }

  getTweets(type){
    this.feedService.searchByText(type, this.searchvalue, this.page, this.size).subscribe({
      next: (res) => {
        this.tweetsList = res;
      }
    })
  }
}
