import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../services/order.service';



@Component({
  selector: 'app-success-payement',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.css']
})
export class SuccessPaymentComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        const order = params.order;
        if (order) {
        this.orderService.updateOrderStatusAfterSuccessPayment(order).subscribe();
        }
      });
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }

}
