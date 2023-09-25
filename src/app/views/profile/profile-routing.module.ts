import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { authGuard } from 'src/app/guards/auth.guard';
import { ProfileSearchComponent } from './profile-search/profile-search.component';

const routes: Routes = [

  {
    path: '',
    component: ProfileComponent,
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
