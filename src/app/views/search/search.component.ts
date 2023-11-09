import { BreakpointObserver } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  filteredProfilesPanelState = false;

  isMobileSize: Observable<boolean> = this.breakpointObserver
  .observe(["(max-width: 498px)"])
  .pipe(map((result) => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    public location: Location,
  ){}

  setPanelState(event){
    this.filteredProfilesPanelState = event;
  }
}
