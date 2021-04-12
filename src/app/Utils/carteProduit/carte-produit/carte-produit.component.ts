import {Component, Input, OnInit} from '@angular/core';
import {Produit} from '../../../../model/produit.model';
import {Variant} from '../../../../model/variant.model';

@Component({
  selector: 'app-carte-produit',
  templateUrl: './carte-produit.component.html',
  styleUrls: ['./carte-produit.component.css']
})
export class CarteProduitComponent implements OnInit {
  @Input()
  produit: Produit;
  variants: Array<Variant>;
  quantite: number;
  prixActuel: number;
  variantSelected: Variant;

  constructor() {
  }

  ngOnInit(): void {
    this.quantite = 0;
    this.variants = this.produit.variants;
    this.prixActuel = 0.0;
  }

  private afficherPrix(prix: number): string {
    // tslint:disable-next-line:no-shadowed-variable
    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    });
    return formatter.format(prix);
  }

  private updatePrice(): void {
    this.prixActuel = this.quantite * this.variantSelected.prix;
  }

  changeQuantity(quantity: number): void {
    console.log(this.variantSelected);
    if((this.quantite === 0 && quantity < 0) || !this.variantSelected) {
      return;
    }
    this.quantite += quantity;
    this.updatePrice();
  }

  selectVariant(vari: Variant): void {
    this.variantSelected = vari;
    if (this.variantSelected) {
      this.quantite = 0;
      this.prixActuel = 0;
    }
  }
}
