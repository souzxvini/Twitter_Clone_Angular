import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreSearchComponent } from './explore-search/explore-search.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { ExploreMainComponent } from './explore-main/explore-main.component';

@NgModule({
  declarations: [
    ExploreMainComponent,
    ExploreSearchComponent
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule
  ]
})
export class ExploreModule { }
