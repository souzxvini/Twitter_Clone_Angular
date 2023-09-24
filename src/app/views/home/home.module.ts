import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeSearchComponent } from './home-search/home-search.component';
import { SearchTwitterButtonComponent } from 'src/app/components/search-twitter-button/search-twitter-button.component';
import { WhoToFollowCardComponent } from 'src/app/components/who-to-follow-card/who-to-follow-card.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { MobileFooterNavComponent } from 'src/app/components/mobile-footer-nav/mobile-footer-nav.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeSearchComponent,
    SearchTwitterButtonComponent,
    WhoToFollowCardComponent,
    FooterComponent,
    MobileFooterNavComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedMaterialModule
  ]
})
export class HomeModule { }
