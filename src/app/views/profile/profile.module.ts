import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileSearchComponent } from './profile-search/profile-search.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileSearchComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule
  ]
})
export class ProfileModule { }
