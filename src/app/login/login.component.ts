import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'huraceweb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    login: any = {
        username: '',
        password: ''
    };

    private return: string = '';

    constructor(private auth: AuthenticationService,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => this.return = params['returnUrl']);
    }

    submitForm() {
        if (this.auth.login(this.login.username, this.login.password)) {
            this.router.navigateByUrl(this.return);
        } else {
            // TODO error message
        }
    }
}
