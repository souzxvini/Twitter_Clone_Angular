import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-following-and-followers',
  templateUrl: './following-and-followers.component.html',
  styleUrls: ['./following-and-followers.component.scss']
})
export class FollowingAndFollowersComponent {

  user: any;
  userInformationsLoaded = false;
  currentUrl: string;
  loggedUser: string;
  accountsList: any[];
  section: string;

  constructor(
    private accountsService: AccountsService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.loggedUser = sessionStorage.getItem('userName');

    this.activatedRoute.params.subscribe(params => {
      
      this.user = this.accountsService.getUserData();
      if (!this.user) {
        this.getUserByIdentifier(params['username'], true);
      } else {
        this.userInformationsLoaded = true;
        this.accountsService.clearUserData();
        this.getFollowsDetails();
      }
    });
  }

  getUserByIdentifier(username, load){
    load ? this.userInformationsLoaded = false : this.userInformationsLoaded = true;
    this.accountsService.getUserByIdentifier(username).subscribe({
      next: (res) => {
        this.user = res;
        this.userInformationsLoaded = true;
        this.getFollowsDetails();
      },
      error: () => {
        this.userInformationsLoaded = true;
      }
    })
  }

  getFollowsDetails(){
    if(this.currentUrl.includes('following')){
      this.section = 'following';
      this.getUserFollowsDetails('following');
    }

    if(this.currentUrl.includes('followers') && !this.currentUrl.includes('verified_followers')  && !this.currentUrl.includes('known_followers')){
      this.section = 'followers';
      this.getUserFollowsDetails('followers');
    }

    if(this.currentUrl.includes('verified_followers')){
      this.section = 'verified_followers';
      this.getUserFollowsDetails('verified_followers');
    }

    if(this.currentUrl.includes('known_followers')){
      this.section = 'known_followers';
      this.getUserFollowsDetails('known_followers');
    }
  }

  getUserFollowsDetails(url: string){
    this.accountsService.getUserFollowsDetails(this.user.username, url, 0 , 10).subscribe({
      next: (res) => {
        this.accountsList = res;
      }
    });
  }

  goBack() {
    this.accountsService.setUserData(this.user);
    this.location.back()
  }

  redirect(url) {
    this.accountsService.setUserData(this.user);
    this.router.navigate(['profile', this.user.username, url])
  }

}
