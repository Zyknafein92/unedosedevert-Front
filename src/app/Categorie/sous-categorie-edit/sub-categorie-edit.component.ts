import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SubCategorie} from '../../../model/sub-categorie';
import {ActivatedRoute, Router} from '@angular/router';
import {SubCategorieService} from '../../../services/sub-categorie.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-sous-categorie-edit',
  templateUrl: './sub-categorie-edit.component.html',
  styleUrls: ['./sub-categorie-edit.component.css']
})
export class SubCategorieEditComponent implements OnInit {

  forms: FormGroup;
  @Input()
  sousCategorie: SubCategorie;
  @Output()
  sousCategorieChange = new EventEmitter();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private subCategorie: SubCategorieService,
    public dialogRef: MatDialogRef<SubCategorieEditComponent>,
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

  private patchValue(id): void {
    this.subCategorie.getSubCategorie(id).subscribe( data => {
      this.sousCategorie = data;
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
    if (!this.sousCategorie || this.sousCategorie.id == null) {
      this.subCategorie.createSubCategorie(this.forms).subscribe(
        next => {
          this.sousCategorieChange.emit(next);
          this.dialogRef.close();
        });
    } else {
      this.subCategorie.updateSubCategorie(this.forms).subscribe(
        next => {
          this.sousCategorieChange.emit(next);
          this.dialogRef.close();
        });
    }
  }
}
