import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { environment } from '../environments/environment';

import { LoginService } from './login/login.service';


declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isProd = environment.production;
  isLoggedIn = false;
  userName = null;

  constructor(public router: Router, private loginService: LoginService) {
    if (this.isProd) {
      // Google analytics
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          gtag('config', 'UA-167455761-1', {
            'page_path': event.urlAfterRedirects
          });
        }
      })
    } else {
      console.log("Google analytics is off");
    }

    const user = this.loginService.getCurrentUser();

    if (user) {
      this.userName = user.username;
      this.isLoggedIn = true;
    }

    this.loginService.getUserName.subscribe(userName => {
      if (userName) {
        this.userName = userName;
        this.isLoggedIn = true;
      } else {
        this.userName = null;
        this.isLoggedIn = false;
      }
    });
  }


  logout() {
    this.loginService.logout();
  }
}
