import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../model/order.model';
import {ServicePartage} from './service.partage';
import {ShoppingCart} from '../model/shopping-cart.model';
import {OrderStatus} from '../model/order-status.model';
import {OrderSpecification} from '../model/order-specification.model';
import {Payment} from '../model/payment.model';
import {FormGroup} from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private URL = '/api/order';

  constructor(private http: HttpClient, private servicePartage: ServicePartage) {
    this.URL = servicePartage.BACKEND_URL + this.URL;
  }


  getOrdersForAdmin(orderSpecification: FormGroup, page: number, size: number, sort: string): Observable<any> {
    return this.http.post<any>(`${this.URL}/admin/?page=${page}&size=${size}&sort=${sort}`, orderSpecification.value);
  }

  getOrders(): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(this.URL);
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.URL}/${id}`);
  }

  getUserOrder(page: number, size: number, sort: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/user/?page=${page}&size=${size}&sort=${sort}`);
  }

  createOrder(order: Order): Observable < Order> {
    return this.http.post<Order>(this.URL, order);
  }

  updateOrder(shoppingCart: ShoppingCart): Observable<Order> {
    return this.http.put<Order>(`${this.URL}`, shoppingCart);
  }

  updateOrderStatusAfterSuccessPayment(order: string): Observable<Order> {
    return this.http.put<Order>(`${this.URL}/${order}/success`, order);
  }

  updateOrderStatusAfterFailurePayment(order: string): Observable<Order> {
    return this.http.put<Order>(`${this.URL}/${order}/failure`, order);
  }

  updateOrderStatusAfterOrderPicking(order: string): Observable<Order> {
    return this.http.put<Order>(`${this.URL}/${order}/picking`, order);
  }

  updateOrderStatusToReadyDelivery(order: string): Observable<Order> {
    return this.http.put<Order>(`${this.URL}/${order}/readyToDelivery`, order);
  }

  updateOrderStatusToDelivery(order: string): Observable<Order> {
    return this.http.put<Order>(`${this.URL}/${order}/delivery`, order);
  }



  deleteCommande(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.URL}/${id}`);
  }
}
