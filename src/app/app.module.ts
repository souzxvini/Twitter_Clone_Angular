import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedMaterialModule } from './shared/shared-material/shared-material.module';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { UnfollowConfirmationModalComponent } from './components/unfollow-confirmation-modal/unfollow-confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    UnfollowConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedMaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
