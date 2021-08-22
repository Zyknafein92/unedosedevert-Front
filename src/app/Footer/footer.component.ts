import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {TokenStorageService} from '../../services/security/token-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
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
