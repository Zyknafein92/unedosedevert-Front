import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-failure-payment',
  templateUrl: './failure-payment.component.html',
  styleUrls: ['./failure-payment.component.css']
})
export class FailurePaymentComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        const order = params.order;
        if (order) {
          this.orderService.updateOrderStatusAfterFailurePayment(order).subscribe();
        }
      });
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }
}
