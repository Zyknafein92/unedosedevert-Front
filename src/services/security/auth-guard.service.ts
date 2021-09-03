import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {TokenStorageService} from './token-storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private tokenService: TokenStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree{
    return this.tokenService.isAdmin();
  }

}
