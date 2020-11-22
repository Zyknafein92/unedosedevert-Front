import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {TokenStorageService} from '../../../services/security/token-storage.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../model/user.model';
import {FormGroup} from '@angular/forms';
import {AdresseService} from '../../../services/adresse.service';
import {Adresse} from '../../../model/adresse.model';

@Component({
  selector: 'app-my-profil',
  templateUrl: './my-profil.component.html',
  styleUrls: ['./my-profil.component.css']
})
export class MyProfilComponent implements OnInit {

  forms: FormGroup;
  user: User;
  messageError: string;


  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, private token: TokenStorageService, private router: Router, private adresseService: AdresseService) { }

  ngOnInit(): void {
    this.initProfil(this.token);
  }

  private initProfil(token: TokenStorageService): void {
    this.userService.getMyProfil(this.token.getEmail()).subscribe( data => {
      this.user = data;
    }),
        err => {
          console.log('error: ', err.error.message);
        };
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(this.user.id).subscribe( next => {
      this.token.signOut();
      this.router.navigate(['/']);
    }),
        err => {
          console.log('error: ', err.error.message);
        };
  }


}
