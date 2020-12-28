import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Categorie} from '../../../model/categorie.model';
import {CategoriesService} from '../../../services/categorie.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ModalConfirmComponent} from '../../Modal/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-categorie-edit',
  templateUrl: './categorie-edit.component.html',
  styleUrls: ['./categorie-edit.component.css']
})
export class CategorieEditComponent implements OnInit {
  forms: FormGroup;
  @Input()
  categorie: Categorie;
  @Output()
  categorieChange = new EventEmitter();

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private categorieService: CategoriesService,
              public dialogRef: MatDialogRef<CategorieEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm();
    if (this.data.id != null) {
      this.patchValue(this.data.id);
    }
  }

  private initForm(): void {
    this.forms = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
    });
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

}
