import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Produit} from '../../../model/produit.model';
import {Router} from '@angular/router';
import {ProduitService} from '../../../services/produit.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {merge} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-admin-view-product',
  templateUrl: './admin-view-product.component.html',
  styleUrls: ['./admin-view-product.component.css']
})
export class AdminViewProductComponent implements AfterViewInit {

  produit: Produit;
  produits: Array<Produit>;
  displayedColumns: string[] = ['name', 'type', 'categorie', 'modifier', 'supprimer'];
  dataSource = new MatTableDataSource<Produit>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private produitService: ProduitService, public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.initProduits();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        return this.produitService.getProduitPage(this.paginator.pageIndex + 1, this.paginator.pageSize , this.sort.direction);
      }));
  }

  private initProduits(): void {
    this.produitService.getProduitPage(0, 30, 'DESC').subscribe(data => {
        this.produits = data.content;
        this.dataSource = new MatTableDataSource<Produit>(this.produits);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('data : ', data);
      },
      err => {
        console.log('error: ', err.error.message);
      });
  }

  creerProduit(): void {
    this.router.navigate(['admin/products/edit']);
  }

  modifierProduit(id: number): void {
    this.router.navigate(['admin/products/edit'], {queryParams: {id}});
  }

  supprimerProduit(id: number): void {
    this.produitService.deleteProduit(id).subscribe( next => this.initProduits()); }
}
