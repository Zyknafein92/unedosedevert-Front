import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../services/security/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  options: any;
  authorities: string;
  tokenEmail: string;

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    console.log('token', this.token);
    this.authorities = this.token.getAuthorities();
    this.tokenEmail = this.token.getEmail();
  }

  logout(): void {
    this.token.signOut();
    window.location.reload();
  }

}
