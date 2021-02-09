import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {Variant} from '../model/variant.model';

@Injectable({
  providedIn: 'root'
})
export class VariantService {
  private URL = 'http://localhost:8080/api/produits/variants';

  constructor(private http: HttpClient) { }

  getTags(): Observable<Array<Variant>> {
    return this.http.get<Array<Variant>>(this.URL);
  }

  getVariant(id: number): Observable<Variant> {
    return this.http.get<Variant>(`${this.URL}/${id}`);
  }

  getVariantPage(page: number, size: number, sort: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/xxx?page=${page}&size=${size}&sort=${sort}`);
  }

  createVariant(form: FormGroup): Observable < Variant> {
    console.log('form:', form.value);
    return this.http.post<Variant>(this.URL, form.value);
  }

  updateVariant(form: FormGroup): Observable<Variant> {
    return this.http.put<Variant>(`${this.URL}`, form.value);
  }

  deleteVariant(id: number): Observable<Variant> {
    return this.http.delete<Variant>(`${this.URL}/${id}`);
  }
}
