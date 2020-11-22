import { Component, OnInit } from '@angular/core';
import {AuthLoginInfo} from '../../../services/security/login-info';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../services/security/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles = '[]';
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  onSubmit(): void {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.email,
      this.form.password);


    this.authService.attemptAuth(this.loginInfo).subscribe(
      response => {
        this.tokenStorage.saveToken(response.accessToken);
        this.tokenStorage.saveEmail(response.email);
        this.tokenStorage.saveAuthorities(response.authorities);
        console.log(response.email);
        console.log(response.accessToken + ' ' + response.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        window.location.reload();
      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
    this.router.navigate(['/']);
  }

  navigateToRegister(): void {
    this.router.navigateByUrl('/user/add');
  }

}
