import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Categorie} from '../../../model/categorie.model';
import {Router} from '@angular/router';
import {CategoriesService} from '../../../services/categorie.service';
import {MatDialog} from '@angular/material/dialog';
import {CategorieEditComponent} from '../categorie-edit/categorie-edit.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';




@Component({
  selector: 'app-admin-view-categorie-list',
  templateUrl: './admin-view-categorie-list.component.html',
  styleUrls: ['./admin-view-categorie-list.component.css']
})
export class AdminViewCategorieListComponent implements  AfterViewInit {


  displayedColumns: string[] = ['name', 'modifier', 'supprimer'];
  isLoadingResults = true;
  categories: Array<Categorie>;
  dataSource = new MatTableDataSource<Categorie>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private router: Router,
              private categorieService: CategoriesService,
              public dialog: MatDialog) {}

  ngAfterViewInit(): void {
   this.initCategories();
  }

  private initCategories(): void {
    this.categorieService.getCategoriePage(1, 20, 'DESC').subscribe(data => {
        this.categories = Array.from(data);
        this.dataSource = new MatTableDataSource<Categorie>(this.categories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('data : ', data);
      },
      err => {
        console.log('error: ', err.error.message);
      });
  }

  creerCategorie(): void {
    const dialogRef = this.dialog.open(CategorieEditComponent, {
      width: '350px',
      data: {}
    });
  }

  modifierCategorie(cat: Categorie): void {
    const dialogRef = this.dialog.open(CategorieEditComponent, {
      width: '350px',
      data: cat
    });
  }

  supprimerCategorie(id: number): void {
    this.categorieService.deleteCategorie(id).subscribe(next => this.initCategories());
  }
}

