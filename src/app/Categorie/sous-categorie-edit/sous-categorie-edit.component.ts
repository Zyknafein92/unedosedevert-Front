import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SousCategorie} from '../../../model/sous-categorie';
import {ActivatedRoute, Router} from '@angular/router';
import {SousCategorieService} from '../../../services/sous-categorie.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-sous-categorie-edit',
  templateUrl: './sous-categorie-edit.component.html',
  styleUrls: ['./sous-categorie-edit.component.css']
})
export class SousCategorieEditComponent implements OnInit {

  forms: FormGroup;
  @Input()
  sousCategorie: SousCategorie;
  @Output()
  sousCategorieChange = new EventEmitter();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private sousCategorieService: SousCategorieService,
    public dialogRef: MatDialogRef<SousCategorieEditComponent>,
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
    this.sousCategorieService.getSousCategorie(id).subscribe( data => {
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
      this.sousCategorieService.createSousCategorie(this.forms).subscribe(
        next => {
          this.sousCategorieChange.emit(next);
          this.dialogRef.close();
        });
    } else {
      this.sousCategorieService.updateSousCategorie(this.forms).subscribe(
        next => {
          this.sousCategorieChange.emit(next);
        });
    }
  }
}
