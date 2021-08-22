import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Categorie} from '../../../model/categorie.model';
import {Type} from '../../../model/type.model';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../model/product.model';
import {Stock} from '../../../model/stock.model';
import {TypeService} from '../../../services/type.service';
import {CategoriesService} from '../../../services/categorie.service';
import {SubCategorie} from '../../../model/sub-categorie';
import {Tag} from '../../../model/tag.model';
import {Label} from '../../../model/label';
import {Variant} from '../../../model/variant.model';
import {Reduction} from '../../../model/reduction.model';
import {LabelService} from '../../../services/label.service';
import {TagService} from '../../../services/tag.service';
import {SubCategorieService} from '../../../services/sub-categorie.service';
import {VariantService} from '../../../services/variant.service';
import {ReductionService} from '../../../services/reduction.service';


@Component({
  selector: 'app-produit-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product;
  forms: FormGroup;
  types: Array<Type>;
  typeToAdd: Type;
  type: Type;
  categories: Array<Categorie>;
  categorie: Categorie;
  stock = Stock;
  stockKeys = Object.keys(this.stock);
  subCategories: Array<SubCategorie>;
  sousCat: SubCategorie;
  tagsList: Array<Tag>;
  tags: FormGroup;
  labels: FormGroup;
  labelList: Array<Label>;
  variants: Array<Variant>;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private typeService: TypeService,
              private categorieService: CategoriesService,
              private reductionService: ReductionService,
              private subCategorieService: SubCategorieService,
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
    this.initSubCategorie();
    this.initTagsForms();
    this.initLabelForms();
  }

  onSubmit(): void {
    if (this.forms.invalid) {
      this.forms.markAllAsTouched();
      return;
    }
    if (!this.product || this.product.id == null) {
      this.productService.createProduit(this.forms).subscribe(
        next => {
          console.log('form to create:', this.forms);
          this.router.navigate(['admin/products']);
        });
    } else {
      this.productService.updateProduit(this.forms).subscribe(
        next => {
          console.log('form to update:', this.forms);
          this.router.navigate(['admin/products']);
        });
    }
  }

  private initForm(): void {
    this.forms = this.formBuilder.group({
      id: '',
      title: ['', Validators.required],
      type: [null, Validators.required],
      categorie: [null, Validators.required],
      subCategorie: [null],
      tags: this.formBuilder.array([]),
      labels: this.formBuilder.array([]),
      origin: ['', Validators.required],
      productDescription: ['', Validators.required],
      brand: ['', Validators.required],
      utilisationAdvice: [''],
      composition: ['', Validators.required],
      whyThisProduct: [''],
      producer: [''],
      producerComment: [''],
      allergen: ['', Validators.required],
      nutritionalInformation: [''],
      additionalInformation: [''],
      reduction: Reduction,
      urlPicture1: [''],
      urlPicture2: [''],
      urlPicture3:[''],
      variant: new Array<Variant>(),
    });
  }

  private initType(): void {
    this.typeService.getTypes().subscribe(data => {
      this.types = data;
      if (this.product && this.product.type) {
        this.product.type = this.types.find(value => value.id === this.product.type.id);
        this.forms.patchValue({
          type: this.product.type,
        });
      }
    });
  }

  private initTags(): void {
    this.tagService.getTags().subscribe( data => {
      this.tagsList = data;
    });
  }

  private initTagsForms(): void {
    this.tags = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  private initLabels(): void  {
    this.labelService.getLabels().subscribe( data => {
      this.labelList = data;
    });
  }

  private initLabelForms(): void {
    this.labels = this.formBuilder.group({
      id: '',
      name: ['' , Validators.required],
    });
  }

  private initCategorie(): void {
    this.categorieService.getCategories().subscribe(data => {
      this.categories = data;
      if (this.product && this.product.categorie) {
        this.product.categorie = this.categories.find(value => value.id === this.product.categorie.id);
        this.forms.patchValue({
          categorie: this.product.categorie,
        });
      }
    });
  }

  private initSubCategorie(): void  {
    this.subCategorieService.getSubCategories().subscribe( data => {
      this.subCategories = data;
      if (this.product && this.product.subCategorie) {
        this.product.subCategorie = this.subCategories.find(value => value.id === this.product.subCategorie.id);
        this.forms.patchValue({
          subCategorie: this.product.subCategorie,
        });
      }
    });
  }

  private initVariants(id: number): void {
    if (this.product == null) { return; }
    this.variantService.getVariantsByProduitId(this.product.id).subscribe(data => {
     this.variants = data;
   });
  }

  private patchValue(id: any): void {
    this.productService.getProduit(id).subscribe(data => {
      this.product = data;
      this.initVariants(this.product.id);
      this.forms.patchValue({
        id: data.id,
        title: data.title,
        type: data.type,
        categorie: data.categorie,
        subCategorie: data.subCategorie,
        tags: data.tags,
        labels: data.labels,
        origin: data.origin,
        productDescription: data.productDescription,
        brand: data.brand,
        utilisationAdvice: data.utilisationAdvice,
        composition: data.composition,
        whyThisProduct: data.whyThisProduct,
        producer: data.producer,
        producerComment: data.producerComment,
        allergen: data.allergen,
        nutritionalInformation: data.nutritionalInformation,
        additionalInformation: data.additionalInformation,
        reduction: data.reduction,
        urlPicture1: data.urlPicture1,
        urlPicture2: data.urlPicture2,
        urlPicture3: data.urlPicture3,
        variant: new Array<Variant>(),
      });
      const tags: FormArray = this.forms.get('tags') as FormArray;
      this.product.tags.forEach(t => tags.value.push(new FormControl(t)));

      const labels: FormArray = this.forms.get('labels') as FormArray;
      this.product.labels.forEach(l => labels.value.push(new FormControl(l)));
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

  updateSubCategorie(subCategorie: SubCategorie): void {
     this.forms.patchValue({
       subCategorie: subCategorie
     });
  }

  uploadFirstPicture(e: any): void {
    console.log(e.target);
    const file = e.target.files.length ? e.target.files[0] : null;
    if (file) {
      this.productService.uploadPicture(file).subscribe(data => {
       this.forms.patchValue({urlPicture1: data.urlPicture});
      });
    }
  }

  uploadSecondPicture(e: any): void {
    console.log(e.target);
    const file = e.target.files.length ? e.target.files[0] : null;
    if (file) {
      this.productService.uploadPicture(file).subscribe(data => {
        this.forms.patchValue({urlPicture2: data.urlPicture});
      });
    }
  }

  uploadThirdPicture(e: any) {
    console.log(e.target);
    const file = e.target.files.length ? e.target.files[0] : null;
    if (file) {
      this.productService.uploadPicture(file).subscribe(data => {
        this.forms.patchValue({urlPicture3: data.urlPicture});
      });
    }
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
      tags.controls.push(tags.value.filter(t => t.value.id !== value.id));
    }
    console.log('after pushing: ', tags);
  }

  isLabelContain(labels: Array<Label>, label: Label): boolean {
    return labels.map(l => l.name).includes((label.name));
  }

  onCheckLabelChange(e): void {
    const labels: FormArray = this.forms.get('labels') as FormArray;
    const value = e.source.value;
    if (e.checked) {
      labels.push(new FormControl(value));
    }
    else {
      labels.controls.push(labels.value.filter(l => l.value.id !== value.id));
    }
    console.log('after pushing: ', labels);
  }

  backToHomePage() : void {
    this.router.navigate(['/']);
  }
}
