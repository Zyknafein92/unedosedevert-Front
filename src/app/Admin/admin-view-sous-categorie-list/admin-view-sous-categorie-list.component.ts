import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {merge} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {SubCategorie} from '../../../model/sub-categorie';
import {SubCategorieService} from '../../../services/sub-categorie.service';
import {SubCategorieEditComponent} from '../../Categorie/sous-categorie-edit/sub-categorie-edit.component';

@Component({
  selector: 'app-admin-view-sous-categorie-list',
  templateUrl: './admin-view-sous-categorie-list.component.html',
  styleUrls: ['./admin-view-sous-categorie-list.component.css']
})
export class AdminViewSubCategorieListComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'modifier', 'supprimer'];
  isLoadingResults = true;
  sousCategories: Array<SubCategorie>;
  dataSource = new MatTableDataSource<SubCategorie>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private router: Router,
              private subCategorieService: SubCategorieService,
              public dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.initSubCategories();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        return this.subCategorieService.getSubCategoriePage(this.paginator.pageIndex + 1, this.paginator.pageSize , this.sort.direction);
      }));
  }

  private initSubCategories(): void {
    this.subCategorieService.getSubCategoriePage(0, 30, 'DESC').subscribe(data => {
        this.sousCategories = data.content;
        this.dataSource = new MatTableDataSource<SubCategorie>(this.sousCategories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log('error: ', err.error.message);
      });
  }

  createSubCategorie(): void {
    const dialogRef = this.dialog.open(SubCategorieEditComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(next => {
      this.initSubCategories();
    });
  }

  updateSubCategorie(cat: SubCategorie): void {
    const dialogRef = this.dialog.open(SubCategorieEditComponent, {
      data: cat
    });
    dialogRef.componentInstance.sousCategorieChange.subscribe(data => {
      this.initSubCategories();
    });
  }

  deleteSubCategorie(id: number): void {
    this.subCategorieService.deleteSubCategorie(id).subscribe(next => this.initSubCategories());
  }
}
