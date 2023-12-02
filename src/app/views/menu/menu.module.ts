import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  declarations: [
    MenuComponent,
    LogoutButtonComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule
  ]
})
export class MenuModule { }
