import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { PostNewTweetModalComponent } from './post-new-tweet-modal/post-new-tweet-modal.component';

@NgModule({
  declarations: [
    MenuComponent,
    LogoutButtonComponent,
    PostNewTweetModalComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule
  ]
})
export class MenuModule { }
