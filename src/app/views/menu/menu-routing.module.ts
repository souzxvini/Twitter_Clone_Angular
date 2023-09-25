import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { signupGuard } from 'src/app/guards/signup.guard';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [

  {
    path:'',
    component: MenuComponent,
    canActivate: [authGuard]
  },
  {
    path:'signup',
    component: MenuComponent,
    canActivate: [signupGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
