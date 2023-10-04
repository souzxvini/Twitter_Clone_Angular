import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { MobileFooterNavComponent } from 'src/app/components/mobile-footer-nav/mobile-footer-nav.component';
import { HomeComponent } from './home.component';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  declarations: [
    HomeComponent,
    MobileFooterNavComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule
  ]
})
export class HomeModule { }
