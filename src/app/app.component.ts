import { Component } from '@angular/core';

import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { HuraceLiveApiService } from './shared/hurace-live-api.service';

@Component({
  selector: 'huraceweb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'HuraceWeb';

    user: SocialUser;
    loggedIn: boolean;

    raceIsLive: boolean;

    constructor(private authService: AuthService,
                private hls: HuraceLiveApiService) {
    }

    ngOnInit() {
        this.authService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
        });
        this.hls.isLive.subscribe(res => this.raceIsLive = res);
    }
    
    signIn(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    } 

    signOut(): void {
        this.authService.signOut();
    }
}
