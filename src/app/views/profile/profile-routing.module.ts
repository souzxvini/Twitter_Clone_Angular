import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/guards/auth.guard';
import { ProfileSearchComponent } from './profile-search/profile-search.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AnotherUserProfileComponent } from './another-user-profile/another-user-profile.component';
import { FollowingAndFollowersComponent } from './following-and-followers/following-and-followers.component';
import { DefaultSearchSectionComponent } from 'src/app/components/default-search-section/default-search-section.component';
import { FollowsListComponent } from './following-and-followers/follows-list/follows-list.component';

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
      { path: '',
        component: FollowingAndFollowersComponent, 
        children: [
          { path: 'following', component: FollowsListComponent},
          { path: 'followers', component: FollowsListComponent},
          { path: 'verified_followers', component: FollowsListComponent},
          { path: 'known_followers', component: FollowsListComponent}
        ] 
      },
      { path: '', component: DefaultSearchSectionComponent, outlet: 'secondary' },
      
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class ProfileRoutingModule { }
