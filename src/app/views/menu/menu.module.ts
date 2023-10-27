import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { LogoutButtonComponent } from './logout-button/logout-button.component';

@NgModule({
  declarations: [
    MenuComponent,
    LogoutButtonComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedMaterialModule
  ]
})
export class MenuModule { }
