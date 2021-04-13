import {Component, OnInit} from '@angular/core';
import {Produit} from '../../../model/produit.model';
import {ProduitService} from '../../../services/produit.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  newProducts: Array<Produit>;

  constructor(private produitService: ProduitService, private router: Router) {
  }

  ngOnInit(): void {
    this.initNewProducts();
  }

  private initNewProducts(): void {
    this.produitService.getProduits().subscribe( data => {
      this.newProducts = data;
    });
  }

  showProduit(produit: Produit): void {
    this.router.navigate(['/product'], {queryParams: {id : produit.id}});
  }
}
