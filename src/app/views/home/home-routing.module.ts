import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { authGuard } from 'src/app/guards/auth.guard';
import { DefaultAsideSectionComponent } from 'src/app/components/default-aside-section/default-aside-section.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    component: DefaultAsideSectionComponent,
    canActivate: [authGuard],
    outlet: 'secondary'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
