import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './views/menu/menu.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [

  {
    path:'',
    component: MenuComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('../app/views/home/home.module').then((m) => m.HomeModule) },
      { path: 'profile', loadChildren: () => import('../app/views/profile/profile.module').then((m) => m.ProfileModule) },
      { path: 'connect_people', loadChildren: () => import('../app/views/connect/connect.module').then((m) => m.ConnectModule) },
      { path: 'explore', loadChildren: () => import('../app/views/explore/explore.module').then((m) => m.ExploreModule) },
      { path: 'search', loadChildren: () => import('../app/views/search/search.module').then((m) => m.SearchModule) },
    ]
  },
  //Pagina inicial
  {
    path: '', loadChildren: () => import('../app/views/initial-page/initial-page.module').then((m) => m.InitialPageModule)
  },
  {
    path: '', loadChildren: () => import('../app/views/menu/menu.module').then((m) => m.MenuModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
