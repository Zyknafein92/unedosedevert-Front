import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Label} from '../../../model/label';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {LabelService} from '../../../services/label.service';
import {MatDialog} from '@angular/material/dialog';
import {merge} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {LabelEditComponent} from '../../Label/label-edit/label-edit.component';

@Component({
  selector: 'app-admin-view-tag-categorie',
  templateUrl: './admin-view-label.component.html',
  styleUrls: ['./admin-view-label.component.css']
})
export class AdminViewLabelComponent implements AfterViewInit {

  label: Label;
  labels: Array<Label>;
  displayedColumns: string[] = ['name', 'modifier', 'supprimer'];
  dataSource = new MatTableDataSource<Label>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private labelService: LabelService, public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.initLabel();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        return this.labelService.getLabelPage(this.paginator.pageIndex + 1, this.paginator.pageSize , this.sort.direction);
      }));
  }

  private initLabel(): void {
    this.labelService.getLabelPage(0, 30, 'DESC').subscribe(data => {
        this.labels = data.content;
        this.dataSource = new MatTableDataSource<Label>(this.labels);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log('error: ', err.error.message);
      });
  }

  creerLabel(): void {
    const dialogRef = this.dialog.open(LabelEditComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(next => {
      this.initLabel();
    });
  }

  modifierLabel(label: Label): void {
    console.log('label: ', label);
    const dialogRef = this.dialog.open(LabelEditComponent, {
      data: label
    });
    dialogRef.componentInstance.labelChange.subscribe(data => {
      this.initLabel();
    });
  }

  supprimerLabel(id: number): void {
    this.labelService.deleteLabel(id).subscribe( next => this.initLabel()); }
}


