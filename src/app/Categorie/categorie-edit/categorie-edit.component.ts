import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Categorie} from '../../../model/categorie.model';
import {SousCategorie} from '../../../model/sous-categorie';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../../services/categorie.service';
import {SousCategorieService} from '../../../services/sous-categorie.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-categorie-edit',
  templateUrl: './categorie-edit.component.html',
  styleUrls: ['./categorie-edit.component.css']
})
export class CategorieEditComponent implements OnInit {

  @Input()
  categorie: Categorie;
  forms: FormGroup;
  sousCategorieList: Array<SousCategorie>;
  sousCategories: FormGroup;
  isChecked: true;
  @Output()
  categorieChange = new EventEmitter();

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private categorieService: CategoriesService,
              private sousCategorieService: SousCategorieService,
              public dialogRef: MatDialogRef<CategorieEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm();
    this.initSousCategories();
    if (this.data.id != null) {
      this.patchValue(this.data.id);
    }
  }

  private initForm(): void {
    this.forms = this.formBuilder.group({
      id: '',
      name: ['', Validators.required],
      sousCategories: this.formBuilder.array([])
    });
  }

  private patchValue(id: number): void {
    this.categorieService.getCategorie(id).subscribe( data => {
      this.categorie = data;
      this.forms.patchValue({
        id: data.id,
        name: data.name,
        sousCategories: data.sousCategories
      });
      const sousCategories: FormArray = this.forms.get('sousCategories') as FormArray;
      this.categorie.sousCategories.forEach(e => sousCategories.push(new FormControl(e)));
    });
  }

  private initSousCategories(): void {
    this.sousCategorieService.getSousCategories().subscribe(
      data => {
        this.sousCategorieList = data;
      });
  }

  private createSousCategorie(): void {
    this.sousCategories = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.forms.invalid) {
      this.forms.markAllAsTouched();
      return;
    }
    if (!this.categorie || this.categorie.id == null) {
      this.categorieService.createCategorie(this.forms).subscribe(
        next => {
          this.categorieChange.emit(next);
          this.dialogRef.close();
        });
    } else {
      this.categorieService.updateCategorie(this.forms).subscribe(
        next => {
          this.categorieChange.emit(next);
        });
    }
  }

  // tslint:disable-next-line:typedef
  onCheckboxChange(e) {
    const sousCategories: FormArray = this.forms.get('sousCategories') as FormArray;
    const value = e.source.value;
    if (e.checked) {
      sousCategories.push(new FormControl(value));
    } else {
      let i = 0;
      sousCategories.controls.forEach((item: FormControl) => {
        console.log('value from formarray: ', item.value, ' value from checkbox: ', value, ' = ? ', item.value.id === value.id);
        if (item.value.id === value.id) {
          sousCategories.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log('after pushing: ', sousCategories);
  }

  // tslint:disable-next-line:typedef
  isContain(sousCategories: Array<SousCategorie>, sousCategorie: SousCategorie) {
    console.log('is contain list', sousCategories);
    return sousCategories.map(t => t.name).includes((sousCategorie.name));
  }

}
