import {Component, Injectable, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../services/security/token-storage.service';
import {Route, Router} from '@angular/router';
import {window} from 'rxjs/operators';

@Component({
  selector: 'app-my-space-selector',
  templateUrl: './my-space-selector.component.html',
  styleUrls: ['./my-space-selector.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class MySpaceSelectorComponent implements OnInit {

  tokenEmail: string;
  actives = {
    home: '',
    mon_espace: '',
    info: '',
    adresse: '',
    command: '',
    retour: ''
  };

  constructor(private token: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.tokenEmail = this.token.getEmail();
    this.initActives();
  }

  logout(): void {
    this.token.signOut();
  }

  routeMySpace(): void {
    this.router.navigate(['/user/mon-espace']);
  }

  routeMyInfo(): void {
    this.router.navigate(['/user/mon-espace/infos']);
  }

  routeMyAdress(): void {
    this.router.navigate(['/user/mon-espace/adresses']);
  }

  routeMyOrders(): void  {
    this.router.navigate(['/user/mon-espace/commandes']);
  }

  routeMyProductsBack(): void {
    this.router.navigate(['/user/mon-espace/retours']);
  }

  private initActives(): void {
    if ( this.router.url.toString() === '/user/mon-espace' ) {
      this.actives.mon_espace = 'active';
    }
    else if ( this.router.url.toString() === '/user/mon-espace/infos' ) {
      this.actives.info = 'active';
    }
    else if ( this.router.url.toString() === '/user/mon-espace/adresses' ) {
      this.actives.adresse = 'active';
    }
    else if ( this.router.url.toString() === '/user/mon-espace/commandes' ) {
      this.actives.command = 'active';
    }
    else if ( this.router.url.toString() === '/user/mon-espace/retours' ) {
      this.actives.retour = 'active';
    } else {
      this.actives.mon_espace = '';
      this.actives.info = '';
      this.actives.adresse = '';
      this.actives.command = '';
      this.actives.retour = '';
    }
  }
}
