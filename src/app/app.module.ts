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
@NgModule({
  declarations: [AppComponent, CardComponent, SearchBarComponent],
  imports: [
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
