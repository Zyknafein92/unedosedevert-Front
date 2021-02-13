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
import {SousCategorie} from '../../../model/sous-categorie';
import {Tag} from '../../../model/tag.model';
import {Label} from '../../../model/label';
import {Variant} from '../../../model/variant.model';
import {Reduction} from '../../../model/reduction.model';
import {LabelService} from '../../../services/label.service';
import {TagService} from '../../../services/tag.service';
import {SousCategorieService} from '../../../services/sous-categorie.service';
import {VariantService} from '../../../services/variant.service';


@Component({
  selector: 'app-produit-edit',
  templateUrl: './produit-edit.component.html',
  styleUrls: ['./produit-edit.component.css']
})
export class ProduitEditComponent implements OnInit {

  produit: Produit;
  forms: FormGroup;
  types: Array<Type>;
  typeToAdd: Type;
  type: Type;
  categories: Array<Categorie>;
  categorie: Categorie;
  stock = Stock;
  stockKeys = Object.keys(this.stock);
  sousCategories: Array<SousCategorie>;
  sousCat: SousCategorie;
  tags: Array<Tag>;
  labels: Array<Label>;
  variants: Array<Variant>;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private produitService: ProduitService,
              private typeService: TypeService,
              private categorieService: CategoriesService,
              private sousCategorieService: SousCategorieService,
              private tagService: TagService,
              private labelService: LabelService,
              private variantService: VariantService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initCategorie();
    this.initType();
    this.initTags();
    this.initLabels();
    this.initSousCategorie();
    this.initVariants();
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        const id = params.id;
        if (id) {
          this.patchValue(id);
        }
      });
  }

  onSubmit(): void {
    if (this.forms.invalid) {
      this.forms.markAllAsTouched();
      return;
    }
    if (!this.produit || this.produit.id == null) {
      this.produitService.createProduit(this.forms).subscribe(
        next => {
          this.router.navigate(['admin/products']);
        });
    } else {
      this.produitService.updateProduit(this.forms).subscribe(
        next => {
          this.router.navigate(['admin/products']);
        });
    }
  }

  private initForm(): void {
    this.forms = this.formBuilder.group({
      id: '',
      name: ['', Validators.required],
      type: Type,
      categorie: Categorie,
      sousCategorie: SousCategorie,
      tags: new Array<Tag>(),
      labels: new Array<Label>(),
      origine: ['', Validators.required],
      descriptionProduit: ['', Validators.required],
      commentaireProduit: ['', Validators.required],
      conseilUtilisation: ['', Validators.required],
      composition: ['', Validators.required],
      pourquoi: ['', Validators.required],
      producteur: ['', Validators.required],
      allergenes: ['', Validators.required],
      infoNutrition: ['', Validators.required],
      reduction: Reduction,
      urlPhoto: ['', Validators.required],
      variant: new Array<Variant>(),
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

  private initTags(): void {
    this.tagService.getTags().subscribe( data => {
      this.tags = data;
    });
  }

  private initLabels(): void  {
    this.labelService.getLabels().subscribe( data => {
      this.labels = data;
    });
  }

  private initSousCategorie(): void  {
    this.sousCategorieService.getSousCategories().subscribe( data => {
      this.sousCategories = data;
    });
  }

  private initVariants(): void {
   this.variantService.getVariants().subscribe( data => {
     this.variants = data;
   });
  }

  private patchValue(id: any): void {
    this.produitService.getProduit(id).subscribe(data => {
      this.produit = data;
      this.forms.patchValue({
        id: data.id,
        name: data.name,
        type: data.type,
        categorie: data.categorie,
        sousCategorie: data.sousCategorie,
        tags: data.tags,
        labels: data.labels,
        origine: data.origine,
        descriptionProduit: data.descriptionProduit,
        commentaireProduit: data.commentaireProduit,
        conseilUtilisation: data.conseilUtilisation,
        composition: data.composition,
        pourquoi: data.pourquoi,
        producteur: data.producteur,
        allergenes: data.allergenes,
        infoNutrition: data.infoNutrition,
        reduction: data.reduction,
        urlPhoto: data.urlPhoto,
        variant: data.variant,
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

  updateSousCategorie(sousCat: any): void {
    const scat = this.categories.find(value => value.id === sousCat.id);
    this.forms.patchValue({
      sousCategorie: scat
    });
  }

  uploadPhoto(e: any): void {
    console.log(e.target);
    const file = e.target.files.length ? e.target.files[0] : null;
    if (file) {
      this.produitService.uploadPhoto(file).subscribe( data => {
       this.forms.patchValue({urlPhoto: data.urlPhoto});
      });
    }
  }
}
