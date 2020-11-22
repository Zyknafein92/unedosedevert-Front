import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Categorie} from '../../../model/categorie.model';
import {Type} from '../../../model/type.model';
import {ProduitService} from '../../../services/produit.service';
import {Produit} from '../../../model/produit.model';
import {Stock} from '../../../model/stock.model';
import {TypeService} from '../../../services/type.service';
import {CategoriesService} from '../../../services/categorie.service';

@Component({
  selector: 'app-produit-edit',
  templateUrl: './produit-edit.component.html',
  styleUrls: ['./produit-edit.component.css']
})
export class ProduitEditComponent implements OnInit {

  forms: FormGroup;
  types: Array<Type>;
  categories: Array<Categorie>;
  stock = Stock;
  stockKeys = Object.keys(this.stock);
  produit: Produit;
  type: Type;
  categorie: Categorie;


  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private produitService: ProduitService,
              private typeService: TypeService,
              private categorieService: CategoriesService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initCategorie();
    this.initType();
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        const id = params.id;
        if (id) {
          this.patchValue(id);
        }
      });
  }

  initForm(): void {
    this.forms = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      type: ['', Validators.required],
      categorie: ['', Validators.required],
      description: ['', Validators.required],
      origine: ['', Validators.required],
      prix: ['', Validators.required],
      tva: ['', Validators.required],
      stock: ['', Validators.required]
      //  picture: ['', Validators.required],
    });
    this.forms.controls['type'].valueChanges.subscribe(type => {
      this.type = type;
    });

    this.forms.controls['categorie'].valueChanges.subscribe(categorie => {
      this.categorie = categorie;
      console.log(categorie);
    });
  }

  onSubmit(): void {
    if (!this.produit || this.produit.id == null) {
      this.produitService.createProduit(this.forms).subscribe(
        next => this.router.navigate(['/admin/products'])
      );
    } else {
      this.produitService.updateProduit(this.forms).subscribe(
        next => this.router.navigate(['/admin/products'])
      );
    }
  }


  private patchValue(id: any): void {
    this.produitService.getProduit(id).subscribe(data => {
      this.produit = data;
      this.forms.patchValue({
        id: data.id,
        name: data.name,
        categorie: data.categorie,
        type: data.type,
        description: data.description,
        origine: data.origine,
        prix: data.prix,
        tva: data.tva,
        stock: data.stock
      });
    });
  }

  private initCategorie(): void {
    this.categorieService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  private initType(): void {
    this.typeService.getTypes().subscribe(data => {
      this.types = data;
    });
  }

  changeFn(e): Array<Categorie> {
    if (e.target.value) {
      this.categories = this.type.categories;
      return this.categories;
    }
  }
}
