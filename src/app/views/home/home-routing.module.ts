import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeSearchComponent } from './home-search/home-search.component';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    component: HomeSearchComponent,
    canActivate: [authGuard],
    outlet: 'secondary'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
