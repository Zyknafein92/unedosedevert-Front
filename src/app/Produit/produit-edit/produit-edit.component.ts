import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Categorie} from '../../../model/categorie.model';
import {Type} from '../../../model/type.model';
import {ProduitService} from '../../../services/produit.service';
import {Produit} from '../../../model/produit.model';
import {Stock} from '../../../model/stock.model';
import {TypeService} from '../../../services/type.service';
import {CategoriesService} from '../../../services/categorie.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-produit-edit',
  templateUrl: './produit-edit.component.html',
  styleUrls: ['./produit-edit.component.css']
})
export class ProduitEditComponent implements OnInit {

  @Input()
  produit: Produit;
  forms: FormGroup;
  types: Array<Type>;
  categories: Array<Categorie>;
  stock = Stock;
  stockKeys = Object.keys(this.stock);
  typeToAdd: Type;
  type: Type;
  categorie: Categorie;

  @Output()
  productChange = new EventEmitter();



  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private produitService: ProduitService,
              private typeService: TypeService,
              private categorieService: CategoriesService,
              public dialogRef: MatDialogRef<ProduitEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initCategorie();
    this.initType();
    if (this.data.id != null) {
      console.log('up', this.data);
      this.patchValue(this.data.id);
    }
  }

  onSubmit(): void {
    if (this.forms.invalid) {
      this.forms.markAllAsTouched();
      return;
    }
    if (!this.produit || this.produit.id == null) {
      this.produitService.createProduit(this.forms).subscribe(
        next => {
          this.productChange.emit(next);
          this.dialogRef.close();
        });
    } else {
      this.produitService.updateProduit(this.forms).subscribe(
        next => {
          console.log('update forms :', this.forms);
          this.productChange.emit(next);
        });
    }
  }

  private initForm(): void {
    this.forms = this.formBuilder.group({
      id: '',
      name: ['', Validators.required],
      type: Type,
      categorie: Categorie,
      description: ['', Validators.required],
      origine: ['', Validators.required],
      prix: ['', Validators.required],
      tva: ['', Validators.required],
      stock: Stock,
      // urlPhoto: ['', Validators.required],
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
        stock: data.stock,
        // urlPhoto: data.urlPhoto
      });
    });
  }

  updateCategorie(categorie: Categorie): void {
   const cat = this.categories.find(value => value.id === categorie.id);
   this.forms.patchValue({
     categorie: cat
   });
  }

  updateType(typ: Type): void {
    this.typeService.getType(typ.id).subscribe(data => {
      this.categories = data.categories;
      this.forms.patchValue({
        type: data
      });
    });
  }

  updateStock(st: any): void {
    this.forms.patchValue({
      stock: st
    });
  }
}
