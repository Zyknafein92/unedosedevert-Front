import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../services/security/token-storage.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authorities: string;
  tokenEmail: string;

  constructor(private token: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.authorities = this.token.getAuthorities();
    this.tokenEmail = this.token.getEmail();
  }

  logout(): void {
    this.token.signOut();
  }

  routerMonEspace(): void {
    if (this.token.getEmail() != null && this.token.getEmail() != '') {
      this.router.navigate(['user/mon-espace']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  routerMonPanier() {
    this.router.navigate(['user/mon-panier']);
  }

  routerAdminSpace() {
    this.router.navigate(['/admin/products']);
  }
}
