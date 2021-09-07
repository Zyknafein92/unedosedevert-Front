import {Router} from '@angular/router';
import {ErrorHandler, Injectable} from '@angular/core';
import {TokenStorageService} from '../security/token-storage.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private router: Router, private cookieService: CookieService) {
  }

  handleError(error: any): void {
    console.log('error customize: ', error);
    if(error.status === 403) {
      this.cookieService.set('jwt-token', '');
      this.cookieService.set('token-email', '');
      this.cookieService.set('token-authority', '');
      this.router.navigate(['/login']);
    }
  }

}
