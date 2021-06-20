import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Panier} from '../model/panier.model';
import {ServicePartage} from './service.partage';
import {PanierLigne} from '../model/panier-ligne.model';
import {FormGroup} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private URL = '/api/user/panier';

  constructor(private http: HttpClient, private servicePartage: ServicePartage) {
    this.URL = servicePartage.BACKEND_URL + this.URL;
  }

  getPanier(id: number): Observable<Panier> {
    return this.http.get<Panier>(`${this.URL}`);
  }

  // createPanier(panier: Panier): Observable <Panier> {
  //   return this.http.post<Panier>(this.URL, panier);
  // }

  // updatePanier(panier: Panier): Observable<Panier> {
  //   return this.http.put<Panier>(`${this.URL}`, panier);
  // }

  // deletePanier(id: number): Observable<Panier> {
  //   return this.http.delete<Panier>(`${this.URL}/${id}`);
  // }

  getPanierLigne(idPanierLigne: number): Observable<PanierLigne> {
    return this.http.get<PanierLigne>(`${this.URL}`);
  }

  addPanierLigne(panierLigne: PanierLigne, id: number): Observable<PanierLigne> {
    return this.http.post<PanierLigne>(`${this.URL}`, panierLigne);
  }

  updatePanierLigne(panierLigne: PanierLigne): Observable<PanierLigne> {
    return this.http.put<PanierLigne>(`${this.URL}`, panierLigne);
  }

  deletePanierLigne(id: number): Observable<PanierLigne> {
    return this.http.delete<PanierLigne>(`${this.URL}/${id}`);
  }
}
