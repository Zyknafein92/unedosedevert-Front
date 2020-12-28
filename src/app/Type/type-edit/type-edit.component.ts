import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Type} from '../../../model/type.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeService} from '../../../services/type.service';
import {Categorie} from '../../../model/categorie.model';
import {CategoriesService} from '../../../services/categorie.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-type-edit',
  templateUrl: './type-edit.component.html',
  styleUrls: ['./type-edit.component.css']
})
export class TypeEditComponent implements OnInit {

  @Input()
  type: Type;
  forms: FormGroup;
  categorieList: Array<Categorie>;
  categories: FormGroup;
  isChecked: true;
  @Output()
  typeChange = new EventEmitter();

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private typeService: TypeService,
              private categorieService: CategoriesService,
              public dialogRef: MatDialogRef<TypeEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initCategories();
    if (this.data.id != null) {
      this.patchValue(this.data.id);
    }
  }

  private initForm(): void {
    this.forms = this.formBuilder.group({
      id: '',
      name: ['', Validators.required],
      categories: this.formBuilder.array([])
    });
  }

  private patchValue(id: number): void {
    this.typeService.getType(id).subscribe(data => {
      this.type = data;
      this.forms.patchValue({
        id: data.id,
        name: data.name,
        categories: data.categories
      });
      console.log('type: ', this.type);
      const categories: FormArray = this.forms.get('categories') as FormArray;
      this.type.categories.forEach(e => categories.push(new FormControl(e)));
    });
  }

  private initCategories(): void {
    this.categorieService.getCategories().subscribe(
      data => this.categorieList = data);
  }

  private createCategorie(): void {
    this.categories = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.forms.invalid) {
      this.forms.markAllAsTouched();
      return;
    }
    if (!this.type || this.type.id == null) {
      this.typeService.createType(this.forms).subscribe(
        next => {
          this.typeChange.emit(next);
        });
    } else {
      this.typeService.updateType(this.forms).subscribe(
        next => this.typeChange.emit(next)
      );
    }
  }

  // tslint:disable-next-line:typedef
  onCheckboxChange(e) {
    const categories: FormArray = this.forms.get('categories') as FormArray;
    const value = e.source.value;
    if (e.checked) {
      categories.push(new FormControl(value));
    }
    else {
      let i = 0 ;
      categories.controls.forEach((item: FormControl) => {
        console.log('value from formarray: ', item.value, ' value from checkbox: ', value, ' = ? ', item.value.id === value.id);
        if (item.value.id === value.id) {
          categories.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log('after pushing: ', categories);
  }

  // tslint:disable-next-line:typedef
  isContain(categories: Array<Categorie>, categorie: Categorie) {
    return categories.map(t => t.name).includes((categorie.name));
  }
}
