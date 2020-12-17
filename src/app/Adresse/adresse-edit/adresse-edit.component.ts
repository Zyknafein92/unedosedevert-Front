import {Component, Inject, Input, OnInit} from '@angular/core';
import {Adresse} from '../../../model/adresse.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AdresseService} from '../../../services/adresse.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../model/user.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-adresse-edit',
  templateUrl: './adresse-edit.component.html',
  styleUrls: ['./adresse-edit.component.css']
})
export class AdresseEditComponent implements OnInit {

  @Input()
  adresse: Adresse;

  forms: FormGroup;
  user: User;


  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private adresseService: AdresseService,
              public dialogRef: MatDialogRef<AdresseEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initFrom();
    if (this.data.id != null) { this.patchValue(this.data.id); }
  }

  private initFrom(): void {
    this.forms = this.formBuilder.group({
      id: ['',  Validators.required],
      userID: this.data.userID,
      nom: ['', Validators.required],
      numero: ['', Validators.required],
      voie: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      batiment: [''],
      digicode: [''],
      interphone: [''],
      etage: ['', Validators.required],
      porte: ['', Validators.required]
    });
  }


  private patchValue(id: any): void {
    this.adresseService.getAdresse(id).subscribe( data => {
      this.adresse = data;
      this.forms.patchValue({
        id: data.id,
        nom: data.nom,
        userID: data.userID,
        numero: data.numero,
        voie: data.voie,
        codePostal: data.codePostal,
        ville: data.ville,
        batiment: data.batiment,
        digicode: data.digicode,
        interphone: data.interphone,
        etage: data.etage,
        porte: data.porte
      });
    });
  }

  onSubmit(): void {
    console.log('onSubmit:', this.forms);
    if (!this.adresse || this.adresse.id == null) {
      this.adresseService.createAdresse(this.forms).subscribe(
        next => this.router.navigate(['user/myprofil'])
      );
    } else {
      this.adresseService.updateAdresse(this.forms).subscribe(
        next => this.router.navigate(['user/myprofil'])
      );
    }
  }
}
