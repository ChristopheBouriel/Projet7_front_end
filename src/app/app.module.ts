import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationListItemComponent } from './publication-list/publication-list-item/publication-list-item.component';
import { PublicationService } from './services/publication.service';


@NgModule({
  declarations: [
    AppComponent,
    PublicationListComponent,
    PublicationListItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    PublicationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
