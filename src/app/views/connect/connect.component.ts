import { BreakpointObserver } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent {

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

  loaded = false;

  constructor(
    public router: Router,
    private location: Location,
  ){}

  ngOnInit(){
    this.getTabIndex();
  }

  getTabIndex() {
    if (this.router.url == 'connect_people') {
      setTimeout(() => {
        this.tabGroup.selectedIndex = 0;
      }, 0);

    }

    if (this.router.url.includes('is_creator_only')) {
      setTimeout(() => {
        this.tabGroup.selectedIndex = 1;
      }, 0);

    }
  }

  tabChange(selectedIndex){
    if (selectedIndex == 0) {
      this.router.navigate(['connect_people']);
    };
    if (selectedIndex == 1) {
      this.router.navigate(['connect_people/is_creator_only']);
    }
  }

  goBack(){
    this.location.back();
  }

}
