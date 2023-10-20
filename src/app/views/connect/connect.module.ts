import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectRoutingModule } from './connect-routing.module';
import { ConnectSearchComponent } from './connect-search/connect-search.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { ConnectComponent } from './connect.component';
import { ConnectListComponent } from './connect-list/connect-list.component';

@NgModule({
  declarations: [
    ConnectSearchComponent,
    ConnectComponent,
    ConnectListComponent
  ],
  imports: [
    CommonModule,
    ConnectRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule
  ]
})
export class ConnectModule { }
