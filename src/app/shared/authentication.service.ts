import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    constructor(private oauthService: OAuthService) { }
    
    login(username: string, password: string): boolean {
        this.oauthService.initImplicitFlow();
        return true;
    }

    logout() {
        this.oauthService.logOut();
    }
    
    isLoggedIn() {
        return this.oauthService.hasValidAccessToken() &&
               this.oauthService.hasValidIdToken();
    }
}
