import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../model/order.model';
import {ServicePartage} from './service.partage';
import {ShoppingCart} from '../model/shopping-cart.model';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private URL = '/api/order';

  constructor(private http: HttpClient, private servicePartage: ServicePartage) {
    this.URL = servicePartage.BACKEND_URL + this.URL;
  }
  getCommandes(): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(this.URL);
  }

  getCommande(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.URL}/${id}`);
  }

  createCommande(order: Order): Observable < Order> {
    return this.http.post<Order>(this.URL, order);
  }

  updateCommande(shoppingCart: ShoppingCart): Observable<Order> {
    return this.http.put<Order>(`${this.URL}`, shoppingCart);
  }

  deleteCommande(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.URL}/${id}`);
  }
}
