import { Component, OnInit } from '@angular/core';
import {Adresse} from '../../../model/adresse.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AdresseService} from '../../../services/adresse.service';

@Component({
  selector: 'app-adresse-edit',
  templateUrl: './adresse-edit.component.html',
  styleUrls: ['./adresse-edit.component.css']
})
export class AdresseEditComponent implements OnInit {

  forms: FormGroup;
  adresse: Adresse;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private adresseService: AdresseService) { }

  ngOnInit(): void {
    this.initFrom();
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        const id = params.id;
        if (id) {
          this.patchValue(id);
        }
      });
  }

  private initFrom() {
    this.forms = this.formBuilder.group({
      id: ['',  Validators.required],
      nom: ['', Validators.required],
      numero: ['', Validators.required],
      voie: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      batiment: ['', Validators.required],
      digicode: ['', Validators.required],
      interphone: ['', Validators.required],
      etage: ['', Validators.required],
      porte: ['', Validators.required]
    });
  }


  private patchValue(id: any) {
    this.adresseService.getAdresse(id).subscribe( data => {
      this.adresse = data;
      this.forms.patchValue({
        id: data.id,
        nom: data.nom,
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

  onSubmit() {
    if (!this.adresse || this.adresse.id == null) {
      this.adresseService.createAdresse(this.forms).subscribe(
        next => this.router.navigate(['/'])
      );
    } else {
      this.adresseService.updateAdresse(this.forms).subscribe(
        next => this.router.navigate([''])
      );
    }
  }
}
