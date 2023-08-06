import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './views/menu/menu.component';
import { HomeSearchComponent } from './views/home/home-search/home-search.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [

  {
    path:'',
    component: MenuComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home',  component: HomeComponent },
      { path: '', component: HomeSearchComponent, outlet: 'secondary'}
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
