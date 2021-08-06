import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServicePartage} from './service.partage';
import {Observable} from 'rxjs';
import {Payment} from '../model/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private URL = 'http://localhost:8181/api/order/payment/checkout';


  constructor(private http: HttpClient, private servicePartage: ServicePartage) { }

  checkout(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.URL}`, payment);
  }
}
