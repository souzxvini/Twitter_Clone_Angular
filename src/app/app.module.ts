import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/home/home.component';
import { MenuComponent } from './views/menu/menu.component';
import { HomeSearchComponent } from './views/home/home-search/home-search.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { WhoToFollowCardComponent } from './components/who-to-follow-card/who-to-follow-card.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MobileFooterNavComponent } from './components/mobile-footer-nav/mobile-footer-nav.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { SearchTwitterButtonComponent } from './components/search-twitter-button/search-twitter-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    HomeSearchComponent,
    WhoToFollowCardComponent,
    MobileFooterNavComponent,
    SearchTwitterButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
