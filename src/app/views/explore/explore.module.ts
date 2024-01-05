import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreAsideComponent } from './aside/explore-aside.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { ExploreMainComponent } from './explore-main/explore-main.component';

@NgModule({
  declarations: [
    ExploreMainComponent,
    ExploreAsideComponent
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule
  ]
})
export class ExploreModule { }
