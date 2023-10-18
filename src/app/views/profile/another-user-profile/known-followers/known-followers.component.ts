import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { setProfilePhoto } from 'src/app/helpers/set-profile-photo';

@Component({
  selector: 'app-known-followers',
  templateUrl: './known-followers.component.html',
  styleUrls: ['./known-followers.component.scss']
})
export class KnownFollowersComponent {

  @Input() knownFollowers: any[];
  @Input() username: string;

  setProfilePhoto = setProfilePhoto;

  constructor(
    private router: Router
  ){}

  redirectToKnownFollowers(){
    this.router.navigate(['profile', this.username, 'known_followers'])
  }
}
