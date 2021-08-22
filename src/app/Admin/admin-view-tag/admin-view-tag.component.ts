import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {merge} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {Tag} from '../../../model/tag.model';
import {TagService} from '../../../services/tag.service';
import {TagEditComponent} from '../../Tags/tag-edit/tag-edit.component';

@Component({
  selector: 'app-admin-view-tag',
  templateUrl: './admin-view-tag.component.html',
  styleUrls: ['./admin-view-tag.component.css']
})
export class AdminViewTagComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'modifier', 'supprimer'];
  tags: Array<Tag>;
  dataSource = new MatTableDataSource<Tag>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private router: Router,
              private tagService: TagService,
              public dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.initTag();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        return this.tagService.getTagPage(this.paginator.pageIndex + 1, this.paginator.pageSize , this.sort.direction);
      }));
  }

  private initTag(): void {
    this.tagService.getTagPage(0, 30, 'DESC').subscribe(data => {
        this.tags = data.content;
        this.dataSource = new MatTableDataSource<Tag>(this.tags);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log('error: ', err.error.message);
      });
  }

  addTag(): void {
    const dialogRef = this.dialog.open(TagEditComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(next => {
      this.initTag();
    });
  }

  updateTag(tag: Tag): void {
    const dialogRef = this.dialog.open(TagEditComponent, {
      data: tag
    });
    dialogRef.componentInstance.tagChange.subscribe(data => {
      this.initTag();
    });
  }

  deleteTag(id: number): void {
    this.tagService.deleteTag(id).subscribe(next => this.initTag());
  }
}
