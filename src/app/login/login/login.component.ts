import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { LoginService} from '../login.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  isPageLoading = false;
  isFailed = false;


  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() { }

  login() {
    this.isPageLoading = true;
    this.isFailed = false;

    this.loginService.login(this.username, this.password)
      .pipe(catchError(err => of(null)))
      .subscribe(user => {
        this.isPageLoading = false;
        if (user) {
          this.router.navigateByUrl(this.loginService.redirectUrl);
        } else {
          this.isFailed = true;
        }
      });
  }
}

