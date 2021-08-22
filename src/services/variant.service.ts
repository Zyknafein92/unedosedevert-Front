import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {Variant} from '../model/variant.model';
import {ServicePartage} from './service.partage';

@Injectable({
  providedIn: 'root'
})
export class VariantService {
  private URL = '/api/produits/';

  constructor(private http: HttpClient, private servicePartage: ServicePartage) {
    this.URL = servicePartage.BACKEND_URL + this.URL;
  }

  getVariantsByProduitId(produitId: number): Observable<Array<Variant>> {
    return this.http.get<Array<Variant>>(`${this.URL}${produitId}/variants`);
  }

  getVariant(produitId: number, id: number): Observable<Variant> {
    return this.http.get<Variant>(`${this.URL}${produitId}/variants/${id}`);
  }

  createVariant(produitId, form: FormGroup): Observable <Variant> {
    console.log(form);
     return this.http.post<Variant>(`${this.URL}${produitId}/variants`, form.value);
  }

  updateVariant(produitId, form: FormGroup): Observable<Variant> {
    console.log(form);
    return this.http.put<Variant>(`${this.URL}${produitId}/variants`, form.value);
  }

  deleteVariant(produitId, id: number): Observable<Variant> {
    return this.http.delete<Variant>(`${this.URL}${produitId}/variants/${id}`);
  }
}
