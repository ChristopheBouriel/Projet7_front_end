import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationListItemComponent } from './publication-list/publication-list-item/publication-list-item.component';
import { SinglePublicationComponent} from './single-publication/single-publication.component';
import { PublicationService } from './services/publication.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './services/auth-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';


const appRoutes: Routes = [
  {path: 'publications', canActivate: [AuthGuard], component: PublicationListComponent},
  {path: 'publications/:id', canActivate: [AuthGuard], component: SinglePublicationComponent},
  {path: 'auth', component: AuthComponent},
  {path: '', component: AuthComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    PublicationListComponent,
    PublicationListItemComponent,
    SinglePublicationComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    PublicationService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
