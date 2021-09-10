import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
  @Output()
  typeEventEmitter = new EventEmitter<Type>();

  constructor(private typeService: TypeService, private categorieService: CategoriesService, private sousCategorieService: SubCategorieService, private router: Router) { }

  ngOnInit(): void {
    this.initCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initCategories();
    this.closeMenu();
  }

  private initCategories(): void {
    this.categories = this.type.categories.sort((c1, c2) => c1.id - c2.id);
  }

  searchProductByCat(cat: string): void {
    const typeSearch = 'cat';
    this.router.navigate(['/products'], {queryParams: {typeSearch  , value : cat}});
    this.closeMenu();
  }

  searchProductBySC(sc: string): void {
    const typeSearch = 'sc';
    this.router.navigate(['/products'], {queryParams: {typeSearch  , value : sc}});
    this.closeMenu();
  }

  closeMenu() : void {
    this.typeEventEmitter.emit();
  }


}
