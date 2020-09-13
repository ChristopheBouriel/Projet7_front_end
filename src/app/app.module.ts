import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationListItemComponent } from './publication-list/publication-list-item/publication-list-item.component';


@NgModule({
  declarations: [
    AppComponent,
    PublicationListComponent,
    PublicationListItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
