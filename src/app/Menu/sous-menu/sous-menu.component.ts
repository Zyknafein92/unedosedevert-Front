import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SousCategorie} from '../../../model/sous-categorie';
import {Categorie} from '../../../model/categorie.model';
import {Type} from '../../../model/type.model';
import {TypeService} from '../../../services/type.service';
import {CategoriesService} from '../../../services/categorie.service';
import {SousCategorieService} from '../../../services/sous-categorie.service';
import {SearchCriteria} from '../../../model/search-criteria';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-sous-menu',
  templateUrl: './sous-menu.component.html',
  styleUrls: ['./sous-menu.component.css']
})
export class SousMenuComponent implements OnInit, OnChanges {
  @Input()
  type: Type;
  categories: Array<Categorie>;
  sousCategories: Array<SousCategorie>;
  searchCriteria: SearchCriteria;

  // tslint:disable-next-line:max-line-length
  constructor(private typeService: TypeService, private categorieService: CategoriesService, private sousCategorieService: SousCategorieService, private router: Router) { }

  ngOnInit(): void {
    this.initCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);
    this.initCategories();
  }

  private initCategories(): void {
   this.categories = this.type.categories;
   console.log('cat:', this.categories);
  }

  searchProduitBySC(sc: string): void {
    const typeSearch = 'sc';
    console.log('sc', sc);
    this.router.navigate(['/products'], {queryParams: {typeSearch  , search : sc}});
  }
  searchProduitByCat(cat: string): void {
    const typeSearch = 'cat';
    console.log('cat', cat);
    this.router.navigate(['/products'], {queryParams: {typeSearch  , search : cat}});
  }
}
