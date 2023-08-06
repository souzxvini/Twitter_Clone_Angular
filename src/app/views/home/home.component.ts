import { Component, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tabState = "stateForYou";

  lastScrollPosition = 0;

  constructor(
    private sidenavService: SidenavService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
  }

  scroll = (event): void => {
    
  };

  onButtonClick() {
    this.sidenavService.notifyButtonClick();
  }

  

}
