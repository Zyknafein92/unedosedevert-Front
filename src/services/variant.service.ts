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

  getVariantsByProduitId(produitID: number): Observable<Array<Variant>> {
    return this.http.get<Array<Variant>>(`${this.URL}${produitID}/variants`);
  }

  getVariant(produitID: number, id: number): Observable<Variant> {
    return this.http.get<Variant>(`${this.URL}${produitID}/variants/${id}`);
  }

  createVariant(form: FormGroup): Observable <Variant> {
     return this.http.post<Variant>(`${this.URL}${form.getRawValue().produitId}/variants`, form.value);
  }

  updateVariant(form: FormGroup): Observable<Variant> {
    return this.http.put<Variant>(`${this.URL}${form.getRawValue().produitId}/variants`, form.value);
  }

  deleteVariant(produitID, id: number): Observable<Variant> {
    return this.http.delete<Variant>(`${this.URL}${produitID}/variants/${id}`);
  }
}
