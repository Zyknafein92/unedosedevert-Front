import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {ProduitService} from '../../../services/produit.service';
import {Produit} from '../../../model/produit.model';
import {SearchCriteria} from '../../../model/search-criteria';



@Component({
  selector: 'app-user-view-type-produit-list',
  templateUrl: './view-product-list-type.component.html',
  styleUrls: ['./view-product-list-type.component.css']
})
export class ViewProductListTypeComponent implements OnInit {

  produits: Array<Produit>;
  produit: Produit;
  search: SearchCriteria = {categorie: null, query: null, type: null};

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private produitService: ProduitService) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.search.categorie = params.categorie;
        this.produitService.getProduitsBySearch(this.search).subscribe(data => {
          this.produits = data;
        });
      });
  }

  voirProduit(id: number): void {
    this.router.navigate(['product'], {queryParams: {id}});
  }
}
