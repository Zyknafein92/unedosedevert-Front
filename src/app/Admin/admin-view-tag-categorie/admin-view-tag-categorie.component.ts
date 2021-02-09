import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Type} from '../../../model/type.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {merge} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators'
import {TagsCategorie} from '../../../model/tags-categorie.model';
import {TagscategorieService} from '../../../services/tagscategorie.service';
import {TagsCategorieEditComponent} from '../../Tags/tags-categorie-edit/tags-categorie-edit.component';

@Component({
  selector: 'app-admin-view-tag-categorie',
  templateUrl: './admin-view-tag-categorie.component.html',
  styleUrls: ['./admin-view-tag-categorie.component.css']
})
export class AdminViewTagCategorieComponent implements AfterViewInit {

  tagCategorie: TagsCategorie;
  tagCategories: Array<TagsCategorie>;
  displayedColumns: string[] = ['name', 'modifier', 'supprimer'];
  dataSource = new MatTableDataSource<TagsCategorie>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private tagCategorieService: TagscategorieService, public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.initTagCategorie();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        return this.tagCategorieService.getTagsCategoriePage(this.paginator.pageIndex + 1, this.paginator.pageSize , this.sort.direction);
      }));
  }

  private initTagCategorie(): void {
    this.tagCategorieService.getTagsCategoriePage(0, 30, 'DESC').subscribe(data => {
        this.tagCategories = data.content;
        this.dataSource = new MatTableDataSource<TagsCategorie>(this.tagCategories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log('error: ', err.error.message);
      });
  }

  creerTagCategorie(): void {
    const dialogRef = this.dialog.open(TagsCategorieEditComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(next => {
      this.initTagCategorie();
    });
  }

  modifierTagCategorie(tagCategorie: TagsCategorie): void {
    const dialogRef = this.dialog.open(TagsCategorieEditComponent, {
      data: tagCategorie
    });
    dialogRef.componentInstance.tagCategorieChange.subscribe(data => {
      this.initTagCategorie();
    });
  }

  supprimerTagCategorie(id: number): void {
    this.tagCategorieService.deleteTagsCategorie(id).subscribe( next => this.initTagCategorie()); }
}


