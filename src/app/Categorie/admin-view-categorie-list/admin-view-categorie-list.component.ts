import { Component, OnInit } from '@angular/core';
import {Categorie} from '../../../model/categorie.model';
import {Router} from '@angular/router';
import {CategoriesService} from '../../../services/categorie.service';

@Component({
  selector: 'app-admin-view-categorie-list',
  templateUrl: './admin-view-categorie-list.component.html',
  styleUrls: ['./admin-view-categorie-list.component.css']
})
export class AdminViewCategorieListComponent implements OnInit {

  categorie: Categorie;
  categories: Array<Categorie>;

  constructor(private router: Router, private categorieService: CategoriesService) { }

  ngOnInit(): void {
    this.initCategories();
  }

  private initCategories(): void {
    this.categorieService.getCategories().subscribe(data => {
        this.categories = data;
        console.log('data : ', data);
      },
      err => {
        console.log('error: ', err.error.message);
      });
  }

  creerCategorie(): void {
    this.router.navigate(['admin/products/categories/edit']);
  }

  modifierCategorie(id: number): void {
    this.router.navigate(['admin/products/categories/edit'], {queryParams: {id}});
  }

  supprimerCategorie(id: number): void {
    this.categorieService.deleteCategorie(id).subscribe( next => this.initCategories()); }


}
