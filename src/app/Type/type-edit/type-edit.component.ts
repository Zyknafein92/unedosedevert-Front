import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Type} from '../../../model/type.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeService} from '../../../services/type.service';
import {Categorie} from '../../../model/categorie.model';
import {CategoriesService} from '../../../services/categorie.service';

@Component({
  selector: 'app-type-edit',
  templateUrl: './type-edit.component.html',
  styleUrls: ['./type-edit.component.css']
})
export class TypeEditComponent implements OnInit {

  forms: FormGroup;
  type: Type;
  categorieList: Array<Categorie>;
  categories: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private typeService: TypeService,
              private categorieService: CategoriesService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initCategories();
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        const id = params.id;
        if (id) {
          this.patchValue(id);
        }
      });
  }

  private initForm(): void {
    this.forms = this.formBuilder.group({
      id: ['',  Validators.required],
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
    if (!this.type || this.type.id == null) {
      this.typeService.createType(this.forms).subscribe(
        next => this.router.navigate(['/admin/products/types'])
      );
    } else {
      this.typeService.updateType(this.forms).subscribe(
        next => this.router.navigate(['/admin/products/types'])
      );
    }
  }

  // tslint:disable-next-line:typedef
  onCheckboxChange(e) {
    const categories: FormArray = this.forms.get('categories') as FormArray;
    console.log('categories: ', categories);
    if (e.target.checked) {
      categories.push(new FormControl(this.categorieList.find(value => value.name === e.target.value)));
    } else {
      let i = 0 ;
      categories.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          categories.removeAt(i);
          return;
        }
        i++;
      });
     }
  }
}
