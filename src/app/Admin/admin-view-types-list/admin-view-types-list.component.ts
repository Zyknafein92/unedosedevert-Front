import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Type} from '../../../model/type.model';
import {Router} from '@angular/router';
import {TypeService} from '../../../services/type.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {merge} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {TypeEditComponent} from '../../Type/type-edit/type-edit.component';

@Component({
  selector: 'app-admin-view-types-list',
  templateUrl: './admin-view-types-list.component.html',
  styleUrls: ['./admin-view-types-list.component.css']
})
export class AdminViewTypesListComponent implements AfterViewInit {

  type: Type;
  types: Array<Type>;
  displayedColumns: string[] = ['name', 'modifier', 'supprimer'];
  isLoadingResults = true;
  dataSource = new MatTableDataSource<Type>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private typeService: TypeService, public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.initTypes();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        return this.typeService.getTypePage(this.paginator.pageIndex + 1, this.paginator.pageSize , this.sort.direction);
      }));
  }

  private initTypes(): void {
    this.typeService.getTypePage(0, 30, 'DESC').subscribe(data => {
        this.types = data.content;
        this.dataSource = new MatTableDataSource<Type>(this.types);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log('error: ', err.error.message);
      });
  }

  creerType(): void {
    const dialogRef = this.dialog.open(TypeEditComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(next => {
      this.initTypes();
    });
  }

  modifierType(type: Type): void {
    const dialogRef = this.dialog.open(TypeEditComponent, {
      data: type
    });
    dialogRef.componentInstance.typeChange.subscribe(data => {
      this.initTypes();
    });
  }

  supprimerType(id: number): void {
    this.typeService.deleteType(id).subscribe( next => this.initTypes()); }
}
