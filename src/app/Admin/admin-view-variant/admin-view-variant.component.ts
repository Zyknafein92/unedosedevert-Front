import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Variant} from '../../../model/variant.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {VariantService} from '../../../services/variant.service';
import {MatDialog} from '@angular/material/dialog';
import {startWith, switchMap} from 'rxjs/operators';
import {merge} from 'rxjs';
import {VariantEditComponent} from '../../Variant/variant-edit/variant-edit.component';


@Component({
  selector: 'app-admin-view-variant',
  templateUrl: './admin-view-variant.component.html',
  styleUrls: ['./admin-view-variant.component.css']
})
export class AdminViewVariantComponent implements OnInit {

  @Input() produitId;

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
    this.variantService.getVariantsByProduitId(this.produitId).subscribe(data => {
        this.dataSource = new MatTableDataSource<Variant>(this.variants);
      },
      err => {
        console.log('error: ', err.error.message);
      });
  }

  creerVariant(): void {
    const dialogRef = this.dialog.open(VariantEditComponent, {
      width: '800',
      height: '600',
      data: {}
    });
    dialogRef.afterClosed().subscribe(next => {
      this.initVariants();
    });
  }

  modifierVariant(variant: Variant): void {
    const dialogRef = this.dialog.open(VariantEditComponent, {
      width: '800',
      height: '600',
      data: variant
    });
    dialogRef.componentInstance.variantChange.subscribe(data => {
      this.initVariants();
    });
  }

  supprimerVariant(id: number): void {
    this.variantService.deleteVariant(id).subscribe(next => this.initVariants());
  }
}
