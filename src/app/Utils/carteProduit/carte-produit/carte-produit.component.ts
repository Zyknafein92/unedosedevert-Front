import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../model/product.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-carte-produit',
  templateUrl: './carte-produit.component.html',
  styleUrls: ['./carte-produit.component.css']
})
export class CarteProduitComponent implements OnInit {

  @Input()
  product : Product;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  smallestProductPrice(product: Product) {
    const prices = [];
    product.variants.forEach( v => prices.push(v.price));
    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    });
    return formatter.format(Math.min(...prices));
  }

  showProduit(produit: Product): void {
    this.router.navigate(['/product'], {queryParams: {id : produit.id}});
  }
}
