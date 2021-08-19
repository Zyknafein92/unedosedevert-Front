import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const USER_KEY = 'AuthUser';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  // private roles: Array<string> = [];
  private role: string;
  private cookieService = window.localStorage;
  constructor(private router: Router) { }

  signOut(): void {
    this.cookieService.clear();
    this.router.navigate(['/']);
  }


  public saveToken(token: string): void {
    this.cookieService.setItem('jwt-token', token);
  }

  public getToken(): string {
    return this.cookieService.getItem('jwt-token');
  }

  public saveEmail(email: string): void {
    this.cookieService.setItem('token-email', email);
  }

  public getEmail(): string {
    return this.cookieService.getItem('token-email');
  }

  public saveAuthorities(authorities: string[]): void {
    this.cookieService.setItem('token-authority', JSON.stringify(authorities));
  }

  public getAuthorities(): string {
    this.role = '';
    const authoritiesString = this.cookieService.getItem('token-authority');
    if (authoritiesString) {
      JSON.parse(authoritiesString).forEach(authority => {
        this.role = authority.length > 0 ? authority[0] : '';
      });
    }
    return this.role;
  }
}
