import {AfterViewInit, Component, Inject, Input, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {TokenStorageService} from '../../../services/security/token-storage.service';
import {Router} from '@angular/router';
import {User} from '../../../model/user.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdresseService} from '../../../services/adresse.service';
import {Commande} from '../../../model/commande.model';
import {Adresse} from '../../../model/adresse.model';
import {Role} from '../../../model/role';
import {Panier} from '../../../model/panier.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-my-profil',
  templateUrl: './my-profil.component.html',
  styleUrls: ['./my-profil.component.css']
})
export class MyProfilComponent implements OnInit{

  user: User;
  forms: FormGroup;
  messageError: string;


  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService,
              private token: TokenStorageService,
              private router: Router,
              private formBuilder: FormBuilder,
              private adresseService: AdresseService) { }


  ngOnInit(): void {
    this.initform();
    this.initProfil(this.token);
  }

  private initform(): void {
    this.forms = this.formBuilder.group(
      {
        nom: new FormControl(),
        prenom: new FormControl(),
        anniversaire: new FormControl(),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')
        ])),
        telephone: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ])),
        password: new FormControl(),
      });
  }

  private initProfil(token: TokenStorageService): void {
    this.userService.getMyProfil(this.token.getEmail()).subscribe( data => {
      this.user = data;
      this.forms.patchValue({
        adresses: data.adresses,
        nom: data.nom,
        prenom: data.prenom,
        anniversaire: data.anniversaire,
        telephone: data.telephone,
        email: data.email,
        password: data.password,
      });
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


// tslint:disable-next-line:typedef
  onSubmit() {

  }
}
