import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ShoppingCart} from '../model/shopping-cart.model';
import {ServicePartage} from './service.partage';
import {ShoppingCartLine} from '../model/shopping-cart-line.model';
import {FormGroup} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private URL = '/api/user/panier';

  constructor(private http: HttpClient, private servicePartage: ServicePartage) {
    this.URL = servicePartage.BACKEND_URL + this.URL;
  }

  getShoppingCart(id: number): Observable<ShoppingCart> {
    return this.http.get<ShoppingCart>(`${this.URL}`);
  }

  getShoppingCartLine(idPanierLigne: number): Observable<ShoppingCartLine> {
    return this.http.get<ShoppingCartLine>(`${this.URL}`);
  }

  addShoppingCartLine(shoppingCartLine: ShoppingCartLine): Observable<ShoppingCartLine> {
    return this.http.post<ShoppingCartLine>(`${this.URL}/panierLigne`, shoppingCartLine);
  }

  updateShoppingCartLine(shoppingCartLine: ShoppingCartLine): Observable<ShoppingCartLine> {
    return this.http.put<ShoppingCartLine>(`${this.URL}`, shoppingCartLine);
  }

  deleteShoppingCartLine(id: number): Observable<ShoppingCartLine> {
    return this.http.delete<ShoppingCartLine>(`${this.URL}/${id}`);
  }
}
