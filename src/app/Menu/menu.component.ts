import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {TokenStorageService} from '../../services/security/token-storage.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  authorities: string;
  tokenEmail: string;

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.authorities = this.token.getAuthorities();
    this.tokenEmail = this.token.getEmail();
  }

  logout(): void {
    this.token.signOut();
    window.location.reload();
  }

}
