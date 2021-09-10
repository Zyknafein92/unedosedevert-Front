import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Order} from '../../../model/order.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {OrderService} from '../../../services/order.service';
import {ShoppingCartService} from '../../../services/shopping-cart.service';
import {PaymentService} from '../../../services/payment.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {merge, Observable} from 'rxjs';
import {startWith, switchMap, tap} from 'rxjs/operators';
import {OrderStatus} from '../../../model/order-status.model';
import {ViewOrderComponent} from '../../Commande/view-order/view-order.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminOrderEditComponent} from '../admin-order-edit/admin-order-edit.component';

@Component({
  selector: 'app-admin-view-order',
  templateUrl: './admin-view-order.component.html',
  styleUrls: ['./admin-view-order.component.css']
})
export class AdminViewOrderComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['orderNumber', 'date', 'total', 'status', 'see'];
  isLoadingResults = true;
  orders: Array<Order>;
  status = OrderStatus;
  orderKeys = Object.keys(this.status);
  dataSource = new MatTableDataSource<Order>();
  forms: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private orderService: OrderService, private shoppingCartService: ShoppingCartService, private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initOrders();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        return this.orderService.getOrdersForAdmin(this.forms, this.paginator.pageIndex + 1, this.paginator.pageSize, this.sort.direction)
      }));
  }

  private initOrders() {
    this.orderService.getOrdersForAdmin(this.forms, 0, 100, 'ASC').subscribe(data => {
        this.orders = data.content;
        this.dataSource = new MatTableDataSource<Order>(this.orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log('error: ', err);
      });
  }


  private initForm() {
    this.forms = this.formBuilder.group({
      orderNumber: '',
      userEmail: '',
      orderStatus: null,
    });
  }

  formatPrice(price: any) {
    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    });
    return formatter.format(price);
  }

  displayStatus(orderStatus: OrderStatus) {
    return OrderStatus[orderStatus];
  }

  seeOrder(order: Order) {
    this.dialog.open(AdminOrderEditComponent, {
      data: order,
      width: '100%',
      height: '100%'
  });
    this.dialog.afterAllClosed.subscribe( data => { this.initOrders()})
  }

  updateStatus(orderStatus: any) {
    this.forms.patchValue({
      orderStatus
    });
  }

  onSubmit(forms: FormGroup) {
    console.log('form: ', this.forms);
    this.orderService.getOrdersForAdmin(this.forms, 0, 100, 'ASC').subscribe(data => {
      this.dataSource = data.content
    });
  }
}
