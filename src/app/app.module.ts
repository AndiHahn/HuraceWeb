import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SkierListComponent } from './skier-list/skier-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SkierEditComponent } from './skier-edit/skier-edit.component';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SearchComponent } from './search/search.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SkierListComponent,
    SkierEditComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
