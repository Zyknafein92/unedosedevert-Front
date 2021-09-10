import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../model/product.model';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Array<Product>;
  newProducts: Array<Product>;
  bestSell :  Array<Product>;


  location;


  constructor(private produitService: ProductService, private router: Router) {
    this.location = window.location;
  }

  ngOnInit(): void {
    this.initNewProducts();
  }

  private initNewProducts(): void {
    this.produitService.getProduits().subscribe( data => {
      this.products = data;
      this.newProducts = this.products.filter( p => p.tags.find(t => t.name == 'Nouveauté'));
      this.bestSell = this.products.filter( p => p.tags.find(t => t.name == 'Meilleures ventes'));
      console.log(this.newProducts)
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

  showAllProduit(tag: string) {
    const typeSearch = 'tag';
    this.router.navigate(['/products'], {queryParams: {typeSearch  , value : tag}});
  }
}
