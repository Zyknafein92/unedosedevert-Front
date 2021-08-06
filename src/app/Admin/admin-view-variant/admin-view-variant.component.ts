import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Variant} from '../../../model/variant.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {VariantService} from '../../../services/variant.service';
import {MatDialog} from '@angular/material/dialog';

import {VariantEditComponent} from '../../Variant/variant-edit/variant-edit.component';

@Component({
  selector: 'app-admin-view-variant',
  templateUrl: './admin-view-variant.component.html',
  styleUrls: ['./admin-view-variant.component.css']
})
export class AdminViewVariantComponent implements OnInit {

  @Input() productId;

  displayedColumns: string[] = ['name', 'modifier', 'supprimer'];
  variants: Array<Variant>;
  dataSource = new MatTableDataSource<Variant>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private router: Router,
              private variantService: VariantService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initVariants();
    }

  private initVariants(): void {
    this.variantService.getVariantsByProduitId(this.productId).subscribe(data => {
        this.variants = data;
        this.dataSource = new MatTableDataSource<Variant>(this.variants);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log('error: ', err.error.message);
      });
  }

  addVariant(): void {
    const variant = new Variant();
    variant.productId = this.productId;
    const dialogRef = this.dialog.open(VariantEditComponent, {
      data: variant
    });
    dialogRef.afterClosed().subscribe(next => {
      this.initVariants();
    });
  }

  updateVariant(variant: Variant): void {
    const dialogRef = this.dialog.open(VariantEditComponent, {
      data: variant
    });
    dialogRef.componentInstance.variantChange.subscribe(data => {
      this.initVariants();
    });
  }

  deleteVariant(id: number): void {
    this.variantService.deleteVariant(this.productId, id).subscribe(next => this.initVariants());
  }
}
