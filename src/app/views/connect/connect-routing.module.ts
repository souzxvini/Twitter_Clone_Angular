import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/guards/auth.guard';
import { ConnectComponent } from './connect.component';
import { ConnectSearchComponent } from './connect-search/connect-search.component';

const routes: Routes = [

  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: ConnectComponent },
      { path: 'is_creator_only', component: ConnectComponent },
      { path: '', component: ConnectSearchComponent, outlet: 'secondary' },
    ],
  }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectRoutingModule { }
