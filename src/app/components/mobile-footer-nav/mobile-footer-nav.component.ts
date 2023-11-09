import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-footer-nav',
  templateUrl: './mobile-footer-nav.component.html',
  styleUrls: ['./mobile-footer-nav.component.scss']
})
export class MobileFooterNavComponent {

  constructor(
    private router: Router
  ){}

  redirectHome(){
    this.router.navigate(['home']);
  }

  redirectExplore(){
    this.router.navigate(['explore']);
  }
}
