import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Commande} from '../model/commande.model';
import {ServicePartage} from './service.partage';



@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private URL = '/api/order';

  constructor(private http: HttpClient, private servicePartage: ServicePartage) {
    this.URL = servicePartage.BACKEND_URL + this.URL;
  }
  getCommandes(): Observable<Array<Commande>> {
    return this.http.get<Array<Commande>>(this.URL);
  }

  getCommande(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.URL}/${id}`);
  }

  createCommande(panier: Commande): Observable < Commande> {
    return this.http.post<Commande>(this.URL, panier);
  }

  updateCommande(panier: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.URL}`, panier);
  }

  deleteCommande(id: number): Observable<Commande> {
    return this.http.delete<Commande>(`${this.URL}/${id}`);
  }
}
