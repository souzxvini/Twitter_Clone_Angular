import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/guards/auth.guard';
import { ConnectComponent } from './connect.component';
import { ConnectAsideComponent } from './connect-aside/connect-aside.component';
import { ConnectListComponent } from './connect-list/connect-list.component';

const routes: Routes = [

  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', 
      component: ConnectComponent,
      children: [
        { path: '', component: ConnectListComponent },
        { path: 'is_creator_only', component: ConnectListComponent }
      ]
    },
      { path: '', component: ConnectAsideComponent, outlet: 'secondary' },
    ],
  }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectRoutingModule { }
