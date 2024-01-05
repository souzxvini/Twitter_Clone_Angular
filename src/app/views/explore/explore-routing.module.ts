import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/guards/auth.guard';
import { ExploreAsideComponent } from './aside/explore-aside.component';
import { ExploreMainComponent } from './explore-main/explore-main.component';

const routes: Routes = [

  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: ExploreMainComponent },
      { path: '', component: ExploreAsideComponent, outlet: 'secondary' },
    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class ExploreRoutingModule { }
