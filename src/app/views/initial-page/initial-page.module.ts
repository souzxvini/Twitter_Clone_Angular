import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialPageRoutingModule } from './initial-page-routing.module';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { CreateAccountModalComponent } from './create-account-modal/create-account-modal.component';
import { FollowingButtonComponent } from 'src/app/components/following-button/following-button.component';
import { InitialPageComponent } from './initial-page.component';
import { EditProfilePictureModalComponent } from 'src/app/components/edit-profile-picture-modal/edit-profile-picture-modal.component';
import { AlyleModule } from 'src/app/shared/shared-material/Alyle.module';

@NgModule({
  declarations: [
    InitialPageComponent,
    LoginModalComponent,
    CreateAccountModalComponent,
    FollowingButtonComponent,
    EditProfilePictureModalComponent
  ],
  imports: [
    CommonModule,
    InitialPageRoutingModule,
    SharedMaterialModule,
    AlyleModule
  ]
})
export class InitialPageModule { }
