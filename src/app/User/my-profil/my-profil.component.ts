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
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TypeEditComponent} from '../../Type/type-edit/type-edit.component';
import {Type} from '../../../model/type.model';
import {AdresseEditComponent} from '../../Adresse/adresse-edit/adresse-edit.component';


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
              public dialog: MatDialog,
              private adresseService: AdresseService) { }


  ngOnInit(): void {
    this.initform();
    this.initProfil(this.token);
  }

  private initform(): void {
    this.forms = this.formBuilder.group(
      {
        id: new FormControl(),
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
        id: data.id,
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
  this.userService.updateUser(this.forms).subscribe(next => {
    this.initProfil(this.token);
  });
  }

  creerAdresse(): void {
    const id = this.user.id;
    console.log('user id:', id);
    const dialogRef = this.dialog.open(AdresseEditComponent, {
      data: {userID: id}
    });
  }

  modifierAdresse(adresse: Adresse): void {
    const dialogRef = this.dialog.open(AdresseEditComponent, {
      data: adresse
    });
  }

  supprimerAdresse(id: number): void {
    console.log('id to delete', id);
    this.adresseService.deleteAdresse(id).subscribe( next => {
      this.initProfil(this.token);
    });
  }

}
