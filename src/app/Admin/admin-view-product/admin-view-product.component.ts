import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Product} from '../../../model/product.model';
import {Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';
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

  product: Product;
  products: Array<Product>;
  displayedColumns: string[] = ['name', 'type', 'categorie','subcategorie', 'modifier', 'supprimer'];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private productService: ProductService, public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.initProducts();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        return this.productService.getProduitPage(this.paginator.pageIndex + 1, this.paginator.pageSize , this.sort.direction);
      }));
  }

  private initProducts(): void {
    this.productService.getProduitPage(0, 100, 'DESC').subscribe(data => {
        this.products = data.content;
        this.dataSource = new MatTableDataSource<Product>(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data);
      },
      err => {
        console.log('error: ', err.error.message);
      });
  }

  addProduct(): void {
    this.router.navigate(['admin/products/edit']);
  }

  updateProduct(id: number): void {
    this.router.navigate(['admin/products/edit'], {queryParams: {id}});
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduit(id).subscribe( next => this.initProducts()); }
}
