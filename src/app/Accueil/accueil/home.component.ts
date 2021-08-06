import {Component, OnInit} from '@angular/core';
import {Product} from '../../../model/product.model';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';
import {Variant} from '../../../model/variant.model';


@Component({
  selector: 'app-accueil',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newProducts: Array<Product>;
  location;

  constructor(private produitService: ProductService, private router: Router) {
    this.location = window.location;
  }

  ngOnInit(): void {
    this.initNewProducts();
  }

  private initNewProducts(): void {
    this.produitService.getProduits().subscribe( data => {
      this.newProducts = data;
    });
  }

  showProduit(produit: Product): void {
    this.router.navigate(['/product'], {queryParams: {id : produit.id}});
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
}
