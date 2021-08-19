import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SubCategorie} from '../../../model/sub-categorie';
import {Categorie} from '../../../model/categorie.model';
import {Type} from '../../../model/type.model';
import {TypeService} from '../../../services/type.service';
import {CategoriesService} from '../../../services/categorie.service';
import {SubCategorieService} from '../../../services/sub-categorie.service';
import {SearchCriteria} from '../../../model/search-criteria';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-sous-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css']
})
export class SubMenuComponent implements OnInit, OnChanges {
  @Input()
  type: Type;
  categories: Array<Categorie>;
  sousCategories: Array<SubCategorie>;

  constructor(private typeService: TypeService, private categorieService: CategoriesService, private sousCategorieService: SubCategorieService, private router: Router) { }

  ngOnInit(): void {
    this.initCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initCategories();
  }

  private initCategories(): void {
   this.categories = this.type.categories;
  }

    searchProduitByCat(cat: string): void {
    const typeSearch = 'cat';
    this.router.navigate(['/products'], {queryParams: {typeSearch  , value : cat}});
  }

  searchProduitBySC(sc: string): void {
    const typeSearch = 'sc';
    this.router.navigate(['/products'], {queryParams: {typeSearch  , value : sc}});
  }
}
