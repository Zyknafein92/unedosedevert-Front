import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../model/product.model';
import {Variant} from '../../../../model/variant.model';

@Component({
  selector: 'app-carte-produit',
  templateUrl: './carte-produit.component.html',
  styleUrls: ['./carte-produit.component.css']
})
export class CarteProduitComponent implements OnInit {
  @Input()
  product: Product;
  variants: Array<Variant>;
  quantity: number;
  actualPrice: number;
  variantSelected: Variant;

  constructor() {
  }

  ngOnInit(): void {
    this.quantity = 0;
    this.variants = this.product.variants;
    this.actualPrice = 0.0;
  }

  displayPrice(price: number): string {
    // tslint:disable-next-line:no-shadowed-variable
    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    });
    return formatter.format(price);
  }

  private updatePrice(): void {
    this.actualPrice = this.quantity * this.variantSelected.price;
  }

  changeQuantity(quantity: number): void {
    if ((this.quantity === 0 && quantity < 0) || !this.variantSelected) {
      return;
    }
    this.quantity += quantity;
    this.updatePrice();
  }

  selectVariant(vari: Variant): void {
    this.variantSelected = vari;
    if (this.variantSelected) {
      this.quantity = 0;
      this.actualPrice = 0;
    }
  }
}
