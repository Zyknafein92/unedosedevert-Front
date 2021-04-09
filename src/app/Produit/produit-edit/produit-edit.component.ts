import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Categorie} from '../../../model/categorie.model';
import {Type} from '../../../model/type.model';
import {ProduitService} from '../../../services/produit.service';
import {Produit} from '../../../model/produit.model';
import {Stock} from '../../../model/stock.model';
import {TypeService} from '../../../services/type.service';
import {CategoriesService} from '../../../services/categorie.service';
import {SousCategorie} from '../../../model/sous-categorie';
import {Tag} from '../../../model/tag.model';
import {Label} from '../../../model/label';
import {Variant} from '../../../model/variant.model';
import {Reduction} from '../../../model/reduction.model';
import {LabelService} from '../../../services/label.service';
import {TagService} from '../../../services/tag.service';
import {SousCategorieService} from '../../../services/sous-categorie.service';
import {VariantService} from '../../../services/variant.service';
import {ReductionService} from '../../../services/reduction.service';


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
              private reductionService: ReductionService,
              private sousCategorieService: SousCategorieService,
              private tagService: TagService,
              private labelService: LabelService,
              private variantService: VariantService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        const id = params.id;
        if (id) {
          this.patchValue(id);
        }
      });
    this.initForm();
    this.initCategorie();
    this.initType();
    this.initTags();
    this.initLabels();
    this.initSousCategorie();
  }

  onSubmit(): void {
    if (this.forms.invalid) {
      console.log(this.forms.valid);
      this.forms.markAllAsTouched();
      return;
    }
    if (!this.produit || this.produit.id == null) {
      this.produitService.createProduit(this.forms).subscribe(
        next => {
          console.log('form to create:', this.forms);
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
      type: [null, Validators.required],
      categorie: [null, Validators.required],
      sousCategorie: [null, Validators.required],
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
      if (this.produit && this.produit.categorie) {
        this.produit.categorie = this.categories.find(value => value.id === this.produit.categorie.id);
        this.forms.patchValue({
          categorie: this.produit.categorie,
        });
      }
    });
  }

  private initType(): void {
    this.typeService.getTypes().subscribe(data => {
      this.types = data;
      if (this.produit && this.produit.type) {
        this.produit.type = this.types.find(value => value.id === this.produit.type.id);
        this.forms.patchValue({
          type: this.produit.type,
        });
      }
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
      if (this.produit && this.produit.sousCategorie) {
        this.produit.sousCategorie = this.sousCategories.find(value => value.id === this.produit.sousCategorie.id);
        this.forms.patchValue({
          sousCategorie: this.produit.sousCategorie,
        });
      }
    });
  }

  private initVariants(id: number): void {
    if (this.produit == null) { return; }
    this.variantService.getVariantsByProduitId(this.produit.id).subscribe( data => {
     this.variants = data;
   });
  }

  private patchValue(id: any): void {
    this.produitService.getProduit(id).subscribe(data => {
      this.produit = data;
      this.initVariants(this.produit.id);
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
        variant: data.variants,
      });
    });
  }

  updateCategorie(cat: Categorie): void {
    cat = this.categories.find(value => value.id === cat.id);
    console.log(cat);
    this.forms.patchValue({
      categorie: cat,
    });
  }

  updateType(typ: Type): void {
    typ = this.types.find(value => value.id === typ.id);
    this.forms.patchValue({
      type: typ,
    });
  }

  updateSousCategorie(sousCat: SousCategorie): void {
     sousCat = this.sousCategories.find(value => value.id === sousCat.id);
     this.forms.patchValue({
       sousCategorie: sousCat
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

  updateTags(tag: Tag): void {
    tag = this.tags.find(value => value.id === tag.id);
    this.forms.patchValue({
      tags: tag
    });
  }

  updateLabels(label: Label): void {
    label = this.labels.find(value => value.id === label.id);
    this.forms.patchValue({
      labels: label
    });
  }

  onCheckLabelChange(e): void {
    const labels: FormArray = this.forms.get('labels') as FormArray;
    const value = e.source.value;
    if (e.checked) {
      labels.push(new FormControl(value));
    }
    else {
      let i = 0 ;
      labels.controls.forEach((item: FormControl) => {
        console.log('value from formarray: ', item.value, ' value from checkbox: ', value, ' = ? ', item.value.id === value.id);
        if (item.value.id === value.id) {
          labels.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log('after pushing: ', labels);
  }

  isLabelContain(labels: Array<Label>, label: Label): boolean {
    return labels.map(l => l.name).includes((label.name));
  }

  isTagContain(tags: Array<Tag>, tag: Tag): boolean {
    return tags.map(t => t.name).includes((tag.name));
  }

  onCheckTagChange(e): void {
    const tags: FormArray = this.forms.get('tags') as FormArray;
    const value = e.source.value;
    if (e.checked) {
      tags.push(new FormControl(value));
    }
    else {
      let i = 0 ;
      tags.controls.forEach((item: FormControl) => {
        console.log('value from formarray: ', item.value, ' value from checkbox: ', value, ' = ? ', item.value.id === value.id);
        if (item.value.id === value.id) {
          tags.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log('after pushing: ', tags);
  }
}
