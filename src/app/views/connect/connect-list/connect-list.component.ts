import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';
import { Location } from '@angular/common';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-connect-list',
  templateUrl: './connect-list.component.html',
  styleUrls: ['./connect-list.component.scss']
})
export class ConnectListComponent {

  loaded = false;
  loadingMoreContent = false;

  accountsList: any[] = [];

  previousScrollTop = 0;

  page = 0;
  size = 15;
  noMoreContent = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(["(max-width: 498px)"])
    .pipe(map((result) => result.matches));

  section: string;

  constructor(
    public router: Router,
    private accountsService: AccountsService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.getSuggestedAccounts(this.page, this.size);

    window.addEventListener('scroll', this.scroll, true);
  }

  getSuggestedAccounts(page, size) {
    page > 0 ? this.loadingMoreContent = true : this.loaded = false;
    this.accountsService.getWhoToFollowAccounts(page, size, localStorage.getItem('userName'), this.router.url.includes('is_creator_only') ? true : false).subscribe({
      next: (res) => {
        this.accountsList = this.accountsList.concat(res);
        this.loaded = true;
        this.loadingMoreContent = false;

        if (res.length < 10) this.noMoreContent = true;
      },
      error: () => {
        this.loaded = true;
      }
    })
  }

  redirectToProfile(profile) {
    this.accountsService.setUserData(profile);

    // Navega para a nova URL 
    this.router.navigate(['profile', profile.username]);
  }

  //carregar mais conteudo ao chegar no final da pagina
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
        if (event.srcElement.scrollTop < this.previousScrollTop) {
          if (mainContainerHeader) {
            mainContainerHeader.style.top = "0";
          }
        } else {
          if (mainContainerHeader) {
            mainContainerHeader.style.top = "-119px";
          }
        }
        this.previousScrollTop = event.srcElement.scrollTop;
      } else {
        if (mainContainerHeader) {
          mainContainerHeader.style.top = "0";
        }
      }
    });
  }

  loadMoreContent() {
    this.page++;
    this.getSuggestedAccounts(this.page, this.size);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

}
