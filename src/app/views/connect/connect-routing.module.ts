import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/guards/auth.guard';
import { ConnectComponent } from './connect.component';
import { ConnectSearchComponent } from './connect-search/connect-search.component';
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
      { path: '', component: ConnectSearchComponent, outlet: 'secondary' },
    ],
  }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectRoutingModule { }
