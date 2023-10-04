import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { authGuard } from 'src/app/guards/auth.guard';
import { DefaultSearchSectionComponent } from 'src/app/components/default-search-section/default-search-section.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    component: DefaultSearchSectionComponent,
    canActivate: [authGuard],
    outlet: 'secondary'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
