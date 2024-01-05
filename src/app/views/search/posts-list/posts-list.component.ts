import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  animations: [
    trigger('fadeInOutAnimation', [
      transition('void => *', [
        animate(400, keyframes([
          style({ opacity: 0 }),
          style({ opacity: 1 }),
        ]))
      ])
    ])
  ]
})
export class PostsListComponent {
  private destroyRef = inject(DestroyRef);

  loaded = false;

  tweetsList: any[] = [];

  page = 0;
  size = 15;
  noMoreContent = false;
  loadingMoreContent = false;

  searchValue: string;

  constructor(
    private feedService: FeedService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.activatedRoute.parent.paramMap.subscribe(params => {
      this.searchValue = params.get('searchvalue');
    });

    this.verifySelectedTab();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.verifySelectedTab();
      }
    });
  
  }

  verifySelectedTab(){
    if (this.router.url.includes('recent')) {
      this.getTweets('LATTER');
    }
    else if (this.router.url.includes('medias')) {
      this.getTweets('MEDIA');
    }
    else{
      this.getTweets('MAIN');
    }
  }

  getTweets(type){
    this.loaded = false;
    this.feedService.searchByText(type, this.searchValue, this.page, this.size).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.tweetsList = res;
          this.loaded = true;
        }, 300);
        
      },
      error: () => {
        this.loaded = true;
      }
    })
  }
}
