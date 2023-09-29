import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tabState = "stateForYou";

  prevScrollpos = 0;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(["(max-width: 498px)"])
    .pipe(map((result) => result.matches));

  constructor(
    private sidenavService: SidenavService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
  }

  scroll = (event): void => {
    const mainContainerHeader = document.getElementById("mainContainerHeader");
    this.isHandset$.subscribe(isHandset => {
      if (isHandset) {
        if (event.srcElement.scrollTop < this.prevScrollpos) {
          if (mainContainerHeader) {
            mainContainerHeader.style.top = "0";
          }
        } else {
          if (mainContainerHeader) {
            mainContainerHeader.style.top = "-6vh";
          }
        }
        this.prevScrollpos = event.srcElement.scrollTop;
      } else {
        if (mainContainerHeader) {
          mainContainerHeader.style.top = "0";

        }

      }
    });


  };

  onButtonClick() {
    this.sidenavService.notifyButtonClick();
  }



}
