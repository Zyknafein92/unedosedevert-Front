import {Component, Input, OnInit} from '@angular/core';
import {Produit} from '../../../model/produit.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categorie-view-produit',
  templateUrl: './categorie-view-produit.component.html',
  styleUrls: ['./categorie-view-produit.component.css']
})
export class CategorieViewProduitComponent implements OnInit {

  @Input()
  produit: Produit;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  voirProduit(id: number): void {
    this.router.navigate(['product'], {queryParams: {id}});
  }
}
