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
  constructor(private cookieService: CookieService, private router: Router) { }

  signOut(): void {
    this.cookieService.set('jwt-token', '');
    this.cookieService.set('token-email', '');
    this.cookieService.set('token-authority', '');
    this.router.navigate(['/']);
  }

  public saveToken(token: string): void {
    this.cookieService.set('jwt-token', token);
  }

  public getToken(): string {
    return this.cookieService.get('jwt-token');
  }

  public saveEmail(email: string): void {
    this.cookieService.set('token-email', email);
  }

  public getEmail(): string {
    return this.cookieService.get('token-email');
  }

  public saveAuthorities(authorities: string[]): void {
    this.cookieService.set('token-authority', JSON.stringify(authorities));
  }

  public getAuthorities(): string {
    this.role = '';
    const authoritiesString = this.cookieService.get('token-authority');
    if (authoritiesString) {
      JSON.parse(authoritiesString).forEach(authority => {
        this.role = authority.length > 0 ? authority[0] : '';
      });
    }
    return this.role;
  }
}
