import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { AuthenticationService } from './shared/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'huraceweb-root',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent {
    title = 'HuraceWeb';

    login: any = {
        username: '',
        password: ''
    };

    private return: string = '';

    constructor(private oauthService: OAuthService,
                private authService: AuthenticationService,
                private router: Router) {
        this.configureWithNewConfigApi();
    }
    
    private configureWithNewConfigApi() {
        this.oauthService.configure(authConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.loadDiscoveryDocumentAndTryLogin();
    }
    
    private isLoggedIn() : boolean {
        return this.authService.isLoggedIn();
    }

    private logOutUser() {
        this.authService.logout();
    }

    private logInUser() {
        if (this.authService.login(this.login.username, this.login.password)) {
            this.router.navigateByUrl(this.return);
        } else {
            // TODO error message
        }
    }
}
