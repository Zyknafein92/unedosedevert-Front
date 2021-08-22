import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Variant} from '../../../model/variant.model';
import {Stock} from '../../../model/stock.model';
import {VariantService} from '../../../services/variant.service';

@Component({
  selector: 'app-variant-edit',
  templateUrl: './variant-edit.component.html',
  styleUrls: ['./variant-edit.component.css']
})
export class VariantEditComponent implements OnInit {

  variant: Variant;
  forms: FormGroup;
  isChecked: true;
  stock = Stock;
  currentStockValue: Stock;
  stockKeys = Object.keys(this.stock);
  @Output()
  variantChange = new EventEmitter();

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private variantService: VariantService,
              public dialogRef: MatDialogRef<VariantEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Variant) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.forms = this.formBuilder.group({
      id: '',
      productId: this.data.productId,
      name: ['', Validators.required],
      price: ['', Validators.required],
      priceKg: ['', Validators.required],
      stock: Stock,
    });
    if (this.data && this.data.id) {
      this.variantService.getVariant(this.data.productId, this.data.id).subscribe(data => {
        this.variant = data;
        this.currentStockValue = data.stock
        this.forms.patchValue({
          id: data.id,
          productId: data.productId,
          name: data.name,
          price: data.price,
          priceKg: data.priceKg,
          stock: data.stock,
        });
      });
    }
  }

  onSubmit(): void {
    if (this.forms.invalid) {
      this.forms.markAllAsTouched();
      return;
    }
    if (!this.variant || this.variant.id == null) {
      this.variantService.createVariant(this.data.productId, this.forms).subscribe(
        next => {
          this.variantChange.emit(next);
          this.dialogRef.close();
        });
    } else {
      this.variantService.updateVariant(this.data.productId, this.forms).subscribe(
        next => {
          this.variantChange.emit(next);
          this.dialogRef.close();
        });
    }
  }

  updateStock(stock: any): void {
    this.forms.patchValue({
      stock
    });
  }
}
