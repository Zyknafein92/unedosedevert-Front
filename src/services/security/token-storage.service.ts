import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const USER_KEY = 'AuthUser';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  // private roles: Array<string> = [];
  private roles: string;
  private token: string;
  constructor(private cookieService: CookieService) { }

  signOut(): void {
    this.cookieService.set('jwt-token', null);
    this.cookieService.set('token-email', null);
    this.cookieService.set('token-authority', '');
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.cookieService.set('jwt-token', token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) || this.cookieService.get('jwt-token');
  }

  public saveEmail(email: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, email);
    this.cookieService.set('token-email', email);
  }

  public getEmail(): string {
    return sessionStorage.getItem(USERNAME_KEY) || this.cookieService.get('token-email');
  }

  public saveAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    this.cookieService.set('token-authority', JSON.stringify(authorities));
  }

  public getAuthorities(): string {
    this.roles = '';
    const authoritiesString = sessionStorage.getItem(AUTHORITIES_KEY) || this.cookieService.get('token-authority');
    if (this.getToken()) {
      JSON.parse(authoritiesString).forEach(authority => {
        this.roles = authority.authority;
      });
    }
    return this.roles;
  }
}
