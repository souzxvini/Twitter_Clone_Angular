import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileAsideComponent } from './profile-aside/profile-aside.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AnotherUserProfileComponent } from './another-user-profile/another-user-profile.component';
import { ProfileNavComponent } from './profile-nav/profile-nav.component';
import { FullScreenProfilePhotoModalComponent } from './modals/full-screen-profile-photo-modal/full-screen-profile-photo-modal.component';
import { EditProfileModalComponent } from './modals/edit-profile-modal/edit-profile-modal.component';
import { FullScreenBackgroundPhotoModalComponent } from './modals/full-screen-background-photo-modal/full-screen-background-photo-modal.component';
import { EditBackgroundPictureModalComponent } from 'src/app/components/edit-background-picture-modal/edit-background-picture-modal.component';
import { AlyleModule } from 'src/app/shared/shared-material/Alyle.module';
import { FollowingAndFollowersComponent } from './following-and-followers/following-and-followers.component';
import { KnownFollowersComponent } from './another-user-profile/known-followers/known-followers.component';
import { FollowsListComponent } from './following-and-followers/follows-list/follows-list.component';
import { BlockedUserComponent } from './another-user-profile/blocked-user/blocked-user.component';
import { BlockedUserActionsComponent } from './another-user-profile/blocked-user/blocked-user-actions/blocked-user-actions.component';
import { UnblockedUserComponent } from './another-user-profile/unblocked-user/unblocked-user.component';
import { UnblockedUserActionsComponent } from './another-user-profile/unblocked-user/unblocked-user-actions/unblocked-user-actions.component';
import { ModalDiscardChangesComponent } from './modals/edit-profile-modal/modal-discard-changes/modal-discard-changes.component';
import { UserHasBlockedLoggedUserComponent } from './another-user-profile/user-has-blocked-logged-user/user-has-blocked-logged-user.component';
import { UserHasBlockedLoggedUserActionsComponent } from './another-user-profile/user-has-blocked-logged-user/actions/user-has-blocked-logged-user-actions.component';

@NgModule({
  declarations: [
    ProfileNavComponent,
    ProfileAsideComponent,
    MyProfileComponent,
    AnotherUserProfileComponent,
    FullScreenProfilePhotoModalComponent,
    ModalDiscardChangesComponent,
    EditProfileModalComponent,
    EditBackgroundPictureModalComponent,
    FullScreenBackgroundPhotoModalComponent,
    FollowingAndFollowersComponent,
    KnownFollowersComponent,
    FollowsListComponent,
    BlockedUserComponent,
    BlockedUserActionsComponent,
    UnblockedUserComponent,
    UnblockedUserActionsComponent,
    UserHasBlockedLoggedUserComponent,
    UserHasBlockedLoggedUserActionsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule,
    AlyleModule
  ]
})
export class ProfileModule { }
