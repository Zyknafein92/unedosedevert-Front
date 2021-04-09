import {Component, Input, OnInit} from '@angular/core';
import {ReductionService} from '../../../services/reduction.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Reduction} from '../../../model/reduction.model';





@Component({
  selector: 'app-reduction-edit',
  templateUrl: './reduction-edit.component.html',
  styleUrls: ['./reduction-edit.component.css']
})
export class ReductionEditComponent implements OnInit {

  @Input()
  produitId;
  reduction: Reduction;
  forms: FormGroup;


  constructor(private router: Router, private formBuilder: FormBuilder,
              private reductionService: ReductionService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.patchValue();
  }

  private initForm(): void {
    this.forms = this.formBuilder.group({
      id: '',
      produitID: this.produitId,
      pourcentageRemise: ['', Validators.required],
      reductionStart: [new FormControl(new Date()), Validators.required],
      reductionEnd: [new FormControl(new Date()), Validators.required],
    });
  }

  private patchValue(): void {
    this.reductionService.getReduction(this.produitId).subscribe(data => {
      this.reduction = data;
      this.forms.patchValue({
        id: data.id,
        produitID: data.produitID,
        pourcentageRemise: data.pourcentageRemise,
        reductionStart: data.reductionStart,
        reductionEnd: data.reductionEnd
      });
    });
  }

  onSubmit(): void {
    if (this.forms.invalid) {
      console.log(this.forms.valid);
      this.forms.markAllAsTouched();
      return;
    }
    if (!this.reduction || this.reduction.id == null) {
      this.reductionService.createReduction(this.forms).subscribe(
        next => {
          console.log('form to create:', this.forms);
          this.router.navigate(['admin/products/edit'],  { queryParams: {id: this.produitId}});
        });
    } else {
      this.reductionService.updateReduction(this.forms).subscribe(
        next => {
          this.router.navigate(['admin/products/edit'],  { queryParams: {id: this.produitId}});
        });
    }
  }

  SupprimerReduction(produitId, id): void {
    this.reductionService.deleteReduction(this.produitId, this.reduction.id).subscribe(next => {
      this.router.navigate(['admin/products/edit'],  { queryParams: {id: this.produitId}});
    });
  }
}
