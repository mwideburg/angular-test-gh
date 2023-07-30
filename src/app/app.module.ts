import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CardDetailsComponent } from './card-details/card-details.component';
import { FeaturedComponent } from './featured/featured.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PictureOfTheDayComponent } from './picture-of-the-day/picture-of-the-day.component';
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SearchBarComponent,
    CardDetailsComponent,
    FeaturedComponent,
    PictureOfTheDayComponent,
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
