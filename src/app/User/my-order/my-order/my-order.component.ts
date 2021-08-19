import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {OrderService} from '../../../../services/order.service';
import {Order} from '../../../../model/order.model';
import {OrderStatus} from '../../../../model/order-status.model';
import {MatDialog} from '@angular/material/dialog';
import {ViewOrderComponent} from '../../../Commande/view-order/view-order.component';
import {ShoppingCartService} from '../../../../services/shopping-cart.service';
import {Route, Router} from '@angular/router';
import {Payment} from '../../../../model/payment.model';
import {PaymentService} from '../../../../services/payment.service';
import {loadStripe} from '@stripe/stripe-js';
import {environment} from '../../../../environments/environment';


@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements AfterViewInit {

  displayedColumns: string[] = ['orderNumber', 'date', 'total', 'status', 'see', 'renew', 'payment'];
  isLoadingResults = true;
  payment: Payment;
  orders: Array<Order>;
  dataSource = new MatTableDataSource<Order>();
  stripePromise = loadStripe(environment.stripe_key);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  invalid: OrderStatus.INVALIDE;

  constructor(private orderService: OrderService, private shoppingCartService: ShoppingCartService, private paymentService: PaymentService, private router: Router, public dialog: MatDialog) { }


  ngAfterViewInit(): void {
    this.initOrders();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        return this.orderService.getUserOrder(this.paginator.pageIndex + 1, this.paginator.pageSize , this.sort.direction);
      }));
  }

  private initOrders() {
    this.orderService.getUserOrder(0, 100,'ASC').subscribe(data => {
        this.orders = data.content;
        this.dataSource = new MatTableDataSource<Order>(this.orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data.content);
      },
      err => {
        console.log('error: ', err.error.message);
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
    this.dialog.open(ViewOrderComponent, {
      data: order,
      width: '100%'
    });
  }

  renewOrder(order: Order) {
    this.shoppingCartService.renewOrder(order).subscribe(
      next => this.router.navigate(['user/mon-panier']));
  }

  paymentRetry(order: Order) {
    if (order != null) {
      this.payment = new Payment();
      let price = parseFloat(order.total.toFixed(2));
      this.payment.price = price * 100;
      this.payment.productName = order.orderNumber;
      this.payment.quantity = 1;
      this.paymentService.checkout(this.payment).subscribe(async data => {
        console.log('call', data);
        const stripe = await this.stripePromise;
        const {error} = await stripe.redirectToCheckout({
          sessionId: data.sessionId
        });
      });
    }
  }

  checkStatus(o: Order) {
    return OrderStatus['INVALIDE'];
  }
}
