import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Commande} from '../model/commande.model';



@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private URL = 'http://localhost:8080/api/order';

  constructor(private http: HttpClient) { }

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
