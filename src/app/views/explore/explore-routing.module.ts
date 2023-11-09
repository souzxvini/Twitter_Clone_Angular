import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/guards/auth.guard';
import { ExploreSearchComponent } from './explore-search/explore-search.component';
import { ExploreMainComponent } from './explore-main/explore-main.component';

const routes: Routes = [

  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: ExploreMainComponent },
      { path: '', component: ExploreSearchComponent, outlet: 'secondary' },
    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class ExploreRoutingModule { }
