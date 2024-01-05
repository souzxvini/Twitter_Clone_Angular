import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/guards/auth.guard';
import { SearchComponent } from './search.component';
import { ExploreAsideComponent } from '../explore/aside/explore-aside.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';

const routes: Routes = [

  {
    path: ':searchvalue',
    canActivate: [authGuard],
    children: [
      { path: '',
        component: SearchComponent, 
        children: [
          { path: '', component: PostsListComponent},
          { path: 'recent', component: PostsListComponent},
          { path: 'peoples', component: AccountsListComponent},
          { path: 'medias', component: PostsListComponent}
        ] 
      },
      { path: '', component: ExploreAsideComponent, outlet: 'secondary' },
      
    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class SearchRoutingModule { }
