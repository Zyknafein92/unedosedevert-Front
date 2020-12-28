import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Categorie} from '../../../model/categorie.model';
import {Router} from '@angular/router';
import {CategoriesService} from '../../../services/categorie.service';
import {MatDialog} from '@angular/material/dialog';
import {CategorieEditComponent} from '../categorie-edit/categorie-edit.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {merge} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';




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
   this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
   merge(this.sort.sortChange, this.paginator.page).pipe(
     startWith({}),
     switchMap(() => {
       return this.categorieService.getCategoriePage(this.paginator.pageIndex + 1, this.paginator.pageSize , this.sort.direction);
     }));
  }

  private initCategories(): void {
    this.categorieService.getCategoriePage(0, 30, 'DESC').subscribe(data => {
        this.categories = data.content;
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
    dialogRef.afterClosed().subscribe(next => {
      this.initCategories();
    });
  }

  modifierCategorie(cat: Categorie): void {
    const dialogRef = this.dialog.open(CategorieEditComponent, {
      width: '350px',
      data: cat
    });
    dialogRef.componentInstance.categorieChange.subscribe(data => {
      this.initCategories();
    });
  }

  supprimerCategorie(id: number): void {
    this.categorieService.deleteCategorie(id).subscribe(next => this.initCategories());
  }
}

