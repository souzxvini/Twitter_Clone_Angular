import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/guards/auth.guard';
import { ProfileSearchComponent } from './profile-search/profile-search.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AnotherUserProfileComponent } from './another-user-profile/another-user-profile.component';
import { FollowingAndFollowersComponent } from './following-and-followers/following-and-followers.component';
import { DefaultSearchSectionComponent } from 'src/app/components/default-search-section/default-search-section.component';

const routes: Routes = [

  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: MyProfileComponent },
      { path: '', component: ProfileSearchComponent, outlet: 'secondary' },
    ],
  }, 
  {
    path: ':username',
    canActivate: [authGuard],
    children: [
      { path: '', component: AnotherUserProfileComponent },
      { path: '', component: ProfileSearchComponent, outlet: 'secondary' },
    ],
  }, 
  {
    path: ':username',
    canActivate: [authGuard],
    children: [
      { path: '', component: DefaultSearchSectionComponent, outlet: 'secondary' },
      { path: 'following', component: FollowingAndFollowersComponent },
      { path: 'followers', component: FollowingAndFollowersComponent },
      { path: 'verified_followers', component: FollowingAndFollowersComponent },
      { path: 'known_followers', component: FollowingAndFollowersComponent }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class ProfileRoutingModule { }
