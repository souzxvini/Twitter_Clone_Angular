import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SearchComponent } from '../search/search.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [
      { path: '', component: SearchComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
