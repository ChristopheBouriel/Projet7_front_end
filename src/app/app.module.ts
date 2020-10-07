import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationListItemComponent } from './publication-list/publication-list-item/publication-list-item.component';
import { SinglePublicationComponent} from './single-publication/single-publication.component';
import { PublicationService } from './services/publication.service';
import { ProfileService } from './services/profile.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './services/auth-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './auth/signup/signup.component';
import { CommentListComponent } from './single-publication/comment-list/comment-list.component';
import { CommentService } from './services/comment.service';
import { CommentListItemComponent } from './single-publication/comment-list/comment-list-item/comment-list-item.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';


import { LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');


const appRoutes: Routes = [
  {path: 'publications', canActivate: [AuthGuard], component: PublicationListComponent},
  {path: 'publications/:id', canActivate: [AuthGuard], component: SinglePublicationComponent},
  {path: 'profile/:userName', canActivate: [AuthGuard], component: ProfileComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', pathMatch: 'full', redirectTo: 'auth'},
];

@NgModule({
  declarations: [
    AppComponent,
    PublicationListComponent,
    PublicationListItemComponent,
    SinglePublicationComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    CommentListComponent,
    CommentListItemComponent,
    HeaderComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    PublicationService,
    CommentService,
    ProfileService,
    AuthService,
    AuthGuard,
    { provide: LOCALE_ID, useValue: "fr" }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
