import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Categorie} from '../../../model/categorie.model';
import {SubCategorie} from '../../../model/sub-categorie';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../../services/categorie.service';
import {SubCategorieService} from '../../../services/sub-categorie.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-categorie-edit',
  templateUrl: './categorie-edit.component.html',
  styleUrls: ['./categorie-edit.component.css']
})
export class CategorieEditComponent implements OnInit {

  categorie: Categorie;
  forms: FormGroup;
  sousCategorieList: Array<SubCategorie>;
  subCategorie: FormGroup;
  isChecked: true;
  @Output()
  categorieChange = new EventEmitter();

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private categorieService: CategoriesService,
              private subCategorieService: SubCategorieService,
              public dialogRef: MatDialogRef<CategorieEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Categorie) { }

  ngOnInit(): void {
    this.categorie = this.data;
    this.initForm();
    this.initSubCategories();
  }

  private initForm(): void {
    this.forms = this.formBuilder.group({
      id: '',
      name: ['', Validators.required],
      subCategorie: this.formBuilder.array([])
    });
    if (this.categorie && this.categorie.id) {
      this.categorieService.getCategorie(this.categorie.id).subscribe( data => {
        this.categorie = data;
        this.forms.patchValue({
          id: data.id,
          name: data.name,
          subCategorie: data.subCategories
        });
        const subCategorie: FormArray = this.forms.get('subCategorie') as FormArray;
        data.subCategories.forEach(e => subCategorie.push(new FormControl(e)));
        console.log(this.forms);
      });
    }
  }

  private initSubCategories(): void {
    this.subCategorieService.getSubCategories().subscribe(
      data => {
        this.sousCategorieList = data;
      });
  }

  onSubmit(): void {
    if (this.forms.invalid) {
      this.forms.markAllAsTouched();
      return;
    }
    if (!this.data || this.data.id == null) {
      this.categorieService.createCategorie(this.forms).subscribe(
        next => {
          this.categorieChange.emit(next);
          this.dialogRef.close();
        });
    } else {
      console.log(this.forms);
      this.categorieService.updateCategorie(this.forms).subscribe(
        next => {
          this.categorieChange.emit(next);
          this.dialogRef.close();
        });
    }
  }

  // tslint:disable-next-line:typedef
  onCheckboxChange(e) {
    const subCategorie: FormArray = this.forms.get('subCategorie') as FormArray;
    const value = e.source.value;
    if (e.checked) {
      subCategorie.push(new FormControl(value));
    } else {
      let i = 0;
      subCategorie.controls.forEach((item: FormControl) => {
        if (item.value.id === value.id) {
          subCategorie.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log('after pushing: ', subCategorie);
  }

  isContain(subCategories: Array<SubCategorie>, subCategorie: SubCategorie) {
    return subCategories.map(t => t.name).includes((subCategorie.name));
  }

}
