import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialPageComponent } from './initial-page.component';
import { signupGuard } from 'src/app/guards/signup.guard';
import { loginGuard } from 'src/app/guards/login.guard';

const routes: Routes = [

  {
    path:'initial-page',
    component: InitialPageComponent,
    canActivate: [loginGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitialPageRoutingModule { }
