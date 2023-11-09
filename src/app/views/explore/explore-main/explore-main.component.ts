import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-explore-main',
  templateUrl: './explore-main.component.html',
  styleUrls: ['./explore-main.component.scss']
})
export class ExploreMainComponent {
  filteredProfilesPanelState = false;

  isMobileSize: Observable<boolean> = this.breakpointObserver
  .observe(["(max-width: 498px)"])
  .pipe(map((result) => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService
  ){}

  onButtonClick() {
    this.sidenavService.notifyButtonClick();
  }

  setPanelState(event){
    this.filteredProfilesPanelState = event;
  }
}
