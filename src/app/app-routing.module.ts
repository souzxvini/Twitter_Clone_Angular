import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './views/menu/menu.component';
import { HomeSearchComponent } from './views/home/home-search/home-search.component';
import { HomeComponent } from './views/home/home.component';
import { authGuard } from './guards/auth.guard';
import { InitialPageComponent } from './views/initial-page/initial-page.component';

const routes: Routes = [

  {
    path:'',
    component: MenuComponent,
    //canActivate: [authGuard],
    children: [
      { path: '', redirectTo: '/timeline', pathMatch: 'full' },
      { path: 'timeline',  component: HomeComponent },
      { path: '', component: HomeSearchComponent, outlet: 'secondary'}
    ]
  },
  {
    path:'login',
    component: InitialPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
