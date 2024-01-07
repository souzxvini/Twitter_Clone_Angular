import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, DestroyRef, HostListener, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
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
  size = 25;
  noMoreContent = false;
  loadingMoreContent = false;

  searchValue: string;

  previousScrollTop = 0;
  prevScrollpos = 0;

  selectedTab = '';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(["(max-width: 498px)"])
    .pipe(map((result) => result.matches));

  constructor(
    private feedService: FeedService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) { }


  ngOnInit() {
    window.addEventListener('scroll', this.onScroll, true);

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

  verifySelectedTab() {
    if (this.router.url.includes('recent')) {
      this.selectedTab = 'LATTER';
      this.getTweets(this.selectedTab);
    }
    else if (this.router.url.includes('medias')) {
      this.selectedTab = 'MEDIA';
      this.getTweets(this.selectedTab);
    }
    else {
      this.selectedTab = 'MAIN';
      this.getTweets(this.selectedTab);
    }
  }

  getTweets(type) {
    this.page > 0 ? this.loadingMoreContent = true : this.loaded = false;
    this.feedService.searchByText(type, this.searchValue, this.page, this.size).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.tweetsList = this.tweetsList.concat(res);
          this.loaded = true;
          this.loadingMoreContent = false;

          if (res.length < this.size) this.noMoreContent = true;
        }, 300);

      },
      error: () => {
        this.loaded = true;
        this.loadingMoreContent = false;
      }
    })
  }

  onScroll = (event): void => {
     this.loadMoreContentScroll(event);
     this.hideHeader(event);
   }

  loadMoreContentScroll(event) {
    if (this.noMoreContent || this.loadingMoreContent) {
      return;
    }

    if (event.target.offsetHeight + event.target.scrollTop == event.target.scrollHeight) {
      this.loadMoreContent();
    }

    this.previousScrollTop = event.srcElement.scrollTop;
  }

  hideHeader(event) {
    const mainContainerHeader = document.getElementById("bluredHeaderStyle");
    this.isHandset$.subscribe(isHandset => {
      if (isHandset) {
        if (event.srcElement.scrollTop < this.prevScrollpos) {
          if (mainContainerHeader) {
            mainContainerHeader.style.top = "0";
          }
        } else {
          if (mainContainerHeader) {
            mainContainerHeader.style.top = "-119px";
          }
        }
        this.prevScrollpos = event.srcElement.scrollTop;
      } else {
        if (mainContainerHeader) {
          mainContainerHeader.style.top = "0";
        }
      }
    });
  }

  loadMoreContent() {
    this.page++;
    this.getTweets(this.selectedTab);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll, true);
  }
}
