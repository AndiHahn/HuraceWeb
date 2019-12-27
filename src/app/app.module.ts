import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SkierListComponent } from './skier-list/skier-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SkierEditComponent } from './skier-edit/skier-edit.component';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { StatisticComponent } from './statistic/statistic.component';
import { ResultComponent } from './result/result.component';
import { LiveComponent } from './live/live.component';
import { StartlistComponent } from './startlist/startlist.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('446653079604810')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SkierListComponent,
    SkierEditComponent,
    StatisticComponent,
    ResultComponent,
    LiveComponent,
    StartlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    AngularFontAwesomeModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
