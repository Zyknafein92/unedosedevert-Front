import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Tag} from '../../../model/tag.model';
import {TagService} from '../../../services/tag.service';


@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.css']
})
export class TagEditComponent implements OnInit {

  forms: FormGroup;
  @Input()
  tag: Tag;
  @Output()
  tagChange = new EventEmitter();

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private tagService: TagService,
              public dialogRef: MatDialogRef<TagEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm();
    if (this.data.id != null) {
      this.patchValue(this.data.id);
    }
  }

  private initForm(): void {
    this.forms = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  private patchValue(id: number): void {
    this.tagService.getTag(id).subscribe( data => {
      this.tag = data;
      this.forms.patchValue({
        id: data.id,
        name: data.name,
        description: data.description
      });
    });
  }

  onSubmit(): void {
    if (this.forms.invalid) {
      this.forms.markAllAsTouched();
      return;
    }
    if (!this.tag || this.tag.id == null) {
      this.tagService.createTag(this.forms).subscribe(
        next => {
          this.tagChange.emit(next);
          this.dialogRef.close();
        });
    } else {
      this.tagService.updateTag(this.forms).subscribe(
        next => {
          this.tagChange.emit(next);
          this.dialogRef.close();
        });
    }
  }

}
