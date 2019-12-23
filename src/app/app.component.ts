import { Component } from '@angular/core';
import { authConfig } from './auth.config';
import { Router } from '@angular/router';

import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'huraceweb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'HuraceWeb';

    user: SocialUser;
    loggedIn: boolean;

    constructor(private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        this.authService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
        });
    }
    
    signIn(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    } 

    signOut(): void {
        this.authService.signOut();
    }
}
