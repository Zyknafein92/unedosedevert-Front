import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Panier} from '../model/panier.model';
import {ServicePartage} from './service.partage';


@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private URL = '/api/order';

  constructor(private http: HttpClient, private servicePartage: ServicePartage) {
    this.URL = servicePartage.BACKEND_URL + this.URL;
  }

  getPaniers(): Observable<Array<Panier>> {
    return this.http.get<Array<Panier>>(this.URL);
  }

  getPanier(id: number): Observable<Panier> {
    return this.http.get<Panier>(`${this.URL}/${id}`);
  }

  createPanier(panier: Panier): Observable < Panier> {
    return this.http.post<Panier>(this.URL, panier);
  }

  updatePanier(panier: Panier): Observable<Panier> {
    return this.http.put<Panier>(`${this.URL}`, panier);
  }

  deletePanier(id: number): Observable<Panier> {
    return this.http.delete<Panier>(`${this.URL}/${id}`);
  }
}
