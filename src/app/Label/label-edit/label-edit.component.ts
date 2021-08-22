import {Component, Inject, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Label} from '../../../model/label';
import {ActivatedRoute, Router} from '@angular/router';
import {LabelService} from '../../../services/label.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-tags-categorie-edit',
  templateUrl: './label-edit.component.html',
  styleUrls: ['./label-edit.component.css']
})
export class LabelEditComponent implements OnInit {

  forms: FormGroup;
  @Output()
  labelChange = new EventEmitter();

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private labelService: LabelService,
              public dialogRef: MatDialogRef<LabelEditComponent>,
              @Inject(MAT_DIALOG_DATA) public label: Label) {
  }

  ngOnInit(): void {
    this.initForm();
    if (this.label.id != null) {
      this.patchValue(this.label.id);
    }
  }

  private initForm(): void {
    this.forms = this.formBuilder.group({
      id: this.label?.id || '',
      name: [this.label?.name || '' , Validators.required],
      urlPicture: [this.label?.urlPicture || '']
    });
  }

  private patchValue(id: number): void {
    this.labelService.getLabel(id).subscribe(label => {
      this.forms.patchValue({
        id: label.id,
        name: label.name,
        urlPicture: label.urlPicture
      });
    });
  }

  onSubmit(): void {
    if (!this.label || this.label.id == null) {
      this.labelService.createLabel(this.forms).subscribe(
        next => {
          this.labelChange.emit(next);
          this.dialogRef.close();
        });
    } else {
      this.labelService.updateLabel(this.forms).subscribe(
        next => {
          this.labelChange.emit(next);
          this.dialogRef.close();
        }
      );
    }
  }

  uploadPicture(e): void {
    console.log(e.target);
    const file = e.target.files.length ? e.target.files[0] : null;
    if (file) {
      this.labelService.uploadPicture(file).subscribe( data => {
        this.forms.patchValue({urlPicture: data.urlPicture});
      });
    }
  }
}
