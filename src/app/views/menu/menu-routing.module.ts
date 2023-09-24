import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { signupGuard } from 'src/app/guards/signup.guard';

const routes: Routes = [

  {
    path:'',
    component: MenuComponent
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
