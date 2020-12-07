import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Categorie} from '../../../model/categorie.model';
import {CategoriesService} from '../../../services/categorie.service';
import {TypeService} from '../../../services/type.service';
import {Type} from '../../../model/type.model';


@Component({
  selector: 'app-user-view-list-product',
  templateUrl: './view-products-list.component.html',
  styleUrls: ['./view-products-list.component.css']
})
export class ViewProductsListComponent implements OnInit {

  categories: Array<Categorie>;
  types: Array<Type>;

  constructor(private router: Router, private categorieService: CategoriesService, private typeService: TypeService) { }

  ngOnInit(): void {
    this.initCategories();
    this.initTypes();
  }

  voirProduits(categorie: number): void {
   this.router.navigate(['products/categorie'], {queryParams: {categorie}});
  }

  private initCategories(): void {
    this.categorieService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  private initTypes(): void {
    this.typeService.getTypes().subscribe( data => {
      this.types = data;
    });
  }
}
