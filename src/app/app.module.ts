import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/home/home.component';
import { MenuComponent } from './views/menu/menu.component';
import { HomeSearchComponent } from './views/home/home-search/home-search.component';
import { WhoToFollowCardComponent } from './components/who-to-follow-card/who-to-follow-card.component';
import { MobileFooterNavComponent } from './components/mobile-footer-nav/mobile-footer-nav.component';
import { SearchTwitterButtonComponent } from './components/search-twitter-button/search-twitter-button.component';
import { FooterComponent } from './components/footer/footer.component';
import { InitialPageComponent } from './views/initial-page/initial-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedMaterialModule } from './shared/shared-material/shared-material.module';
import { CreateAccountModalComponent } from './views/initial-page/create-account-modal/create-account-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    HomeSearchComponent,
    WhoToFollowCardComponent,
    MobileFooterNavComponent,
    SearchTwitterButtonComponent,
    FooterComponent,
    InitialPageComponent,
    CreateAccountModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
