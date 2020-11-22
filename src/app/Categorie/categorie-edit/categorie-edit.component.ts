import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Categorie} from '../../../model/categorie.model';
import {CategoriesService} from '../../../services/categorie.service';

@Component({
  selector: 'app-categorie-edit',
  templateUrl: './categorie-edit.component.html',
  styleUrls: ['./categorie-edit.component.css']
})
export class CategorieEditComponent implements OnInit {
  forms: FormGroup;
  categorie: Categorie;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private categorieService: CategoriesService) { }

  ngOnInit(): void {
    this.initForm();
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
      id: [''],
      name: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.categorie || this.categorie.id == null) {
      this.categorieService.createCategorie(this.forms).subscribe(
        next => this.router.navigate(['/admin/products/categories'])
      );
    } else {
      this.categorieService.updateCategorie(this.forms).subscribe(
        next => this.router.navigate(['/admin/products/categories'])
      );
    }
  }

  private patchValue(id: number): void {
    this.categorieService.getCategorie(id).subscribe( data => {
      this.categorie = data;
      this.forms.patchValue({
        id: data.id,
        name: data.name,
      });
    });
  }

}
