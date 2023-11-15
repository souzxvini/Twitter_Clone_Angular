import { BreakpointObserver } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

  filteredProfilesPanelState = false;
  searchvalue = this.activatedRoute.snapshot.params['searchvalue'];

  isMobileSize: Observable<boolean> = this.breakpointObserver
  .observe(["(max-width: 498px)"])
  .pipe(map((result) => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    public location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this.getTabIndex();

    //ao mudar a rota
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getTabIndex();
      }
    });
  }

  setPanelState(event){
    this.filteredProfilesPanelState = event;
  }

  getTabIndex() {
    if (this.router.url.includes('recent')) {
      setTimeout(() => {
        this.tabGroup.selectedIndex = 1;
      }, 0);
    }
    else if (this.router.url.includes('peoples')) {
      setTimeout(() => {
        this.tabGroup.selectedIndex = 2;
      }, 0);
    }
    else if (this.router.url.includes('medias')) {
      setTimeout(() => {
        this.tabGroup.selectedIndex = 3;
      }, 0);
    }
    else{
      setTimeout(() => {
        this.tabGroup.selectedIndex = 0;
      }, 0);
    }
  }

  tabChange(selectedIndex){
    if (selectedIndex == 0) {
      this.router.navigate(['search', this.searchvalue], { replaceUrl: true });
    };
    if (selectedIndex == 1) {
      this.router.navigate(['search', this.searchvalue, 'recent'], { replaceUrl: true });
    }
    if (selectedIndex == 2) {
      this.router.navigate(['search', this.searchvalue, 'peoples'], { replaceUrl: true });
    }
    if (selectedIndex == 3) {
      this.router.navigate(['search', this.searchvalue, 'medias'], { replaceUrl: true });
    }
  }
}
