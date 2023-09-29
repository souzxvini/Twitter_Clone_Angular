import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/guards/auth.guard';
import { ProfileSearchComponent } from './profile-search/profile-search.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AnotherUserProfileComponent } from './another-user-profile/another-user-profile.component';

const routes: Routes = [

  {
    path: '',
    component: MyProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: ':username',
    component: AnotherUserProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    component: ProfileSearchComponent,
    canActivate: [authGuard],
    outlet: 'secondary'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
