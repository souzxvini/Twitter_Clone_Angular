import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { SearchRoutingModule } from './search-routing.module';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { PostsListComponent } from './posts-list/posts-list.component';

@NgModule({
  declarations: [
    AccountsListComponent,
    PostsListComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    SharedComponentsModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
