import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { verifyIfItsLoggedUser } from 'src/app/helpers/verify-if-its-user-logged';
import { AccountsService } from 'src/app/services/accounts.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

@Component({
  selector: 'app-follows-list',
  templateUrl: './follows-list.component.html',
  styleUrls: ['./follows-list.component.scss']
})
export class FollowsListComponent {

  loaded = false;
  loadingMoreContent = false;

  user: any;

  accountsList: any[] = [];

  section: string;

  page = 0;
  size = 10;
  noMoreContent = false;

  previousScrollTop = 0;

  verifyIfItsLoggedUser = verifyIfItsLoggedUser;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(["(max-width: 498px)"])
    .pipe(map((result) => result.matches));

  prevScrollpos = 0;

  constructor(
    private accountsService: AccountsService,
    public router: Router,
    private breakpointObserver: BreakpointObserver,
    private globalVariablesService: GlobalVariablesService
  ) { }

  ngOnInit(){
    window.addEventListener('scroll', this.scroll, true);

    this.user = this.globalVariablesService.getAnotherUser();

    this.globalVariablesService.clearAnotherUser();

    this.globalVariablesService.followedSuggestedUserWhileOnFollowingAndFollowersChange$.subscribe(() => {
      if (this.loaded) {
        var profile = this.accountsList.findIndex(x => x.username == this.globalVariablesService.getAnotherUser().username);
        if (profile !== -1) {
          this.accountsList[profile] = { ...this.accountsList[profile], ...this.globalVariablesService.getAnotherUser() }
          setTimeout(() => {
            this.globalVariablesService.clearAnotherUser();
          }, 0)
        }
      }
    });

    if(this.user){
      this.getFollowsDetails();
    } 
  }

  getFollowsDetails() {
    if (this.router.url.includes('following')) {
      this.section = 'following';
      this.getUserFollowsDetails(this.section, this.page, this.size);
    }

    if (this.router.url.includes('followers') && !this.router.url.includes('verified_followers') && !this.router.url.includes('known_followers')) {
      this.section = 'followers';
      this.getUserFollowsDetails(this.section, this.page, this.size);
    }

    if (this.router.url.includes('verified_followers')) {
      this.section = 'verified_followers';
      this.getUserFollowsDetails(this.section, this.page, this.size);
    }

    if (this.router.url.includes('known_followers')) {
      this.section = 'known_followers';
      this.getUserFollowsDetails(this.section, this.page, this.size);
    }
  }

  getUserFollowsDetails(url: string, page, size) {
    page > 0 ? this.loadingMoreContent = true : this.loaded = false;
    this.accountsService.getUserFollowsDetails(this.user.username, url, page, size).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.accountsList = this.accountsList.concat(res);
          this.loaded = true;
          this.loadingMoreContent = false;

          if (res.length < 10) this.noMoreContent = true;
        }, 400)

      },
      error: () => {
        this.loaded = true;
        this.loadingMoreContent = false;
      }
    });
  }

  redirectToProfile(profile: any) {

    if (profile.username == sessionStorage.getItem('userName')) {
      this.router.navigate(['profile']);
    } else {
      this.globalVariablesService.setAnotherUser(profile);

      this.router.navigate(['profile', profile.username]);
    }
  }

  scroll = (event): void => {
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
    this.getUserFollowsDetails(this.section, this.page, this.size);
  }

  redirect(){
    this.router.navigate(['connect_people'], { replaceUrl: true });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }
}
