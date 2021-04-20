import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reduction} from '../model/reduction.model';
import {FormGroup} from '@angular/forms';
import {ServicePartage} from './service.partage';

@Injectable({
  providedIn: 'root'
})
export class ReductionService {
  private URL = '/api/produits/';

  constructor(private http: HttpClient, private servicePartage: ServicePartage) {
    this.URL = servicePartage.BACKEND_URL + this.URL;
  }

  getReductions(): Observable<Array<Reduction>> {
    return this.http.get<Array<Reduction>>(this.URL);
  }

  getReduction(produitID: number): Observable<Reduction> {
    return this.http.get<Reduction>(`${this.URL}${produitID}/reduction`);
  }

  getReductionPage(page: number, size: number, sort: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/xxx?page=${page}&size=${size}&sort=${sort}`);
  }

  createReduction(form: FormGroup): Observable < Reduction> {
    console.log('form:', form.value);
    return this.http.post<Reduction>(`${this.URL}${form.getRawValue().produitID}/reduction`, form.value);
  }

  updateReduction(form: FormGroup): Observable<Reduction> {
    return this.http.put<Reduction>(`${this.URL}${form.getRawValue().produitID}/reduction`, form.value);
  }

  deleteReduction(produitID: number, id: number): Observable<Reduction> {
    return this.http.delete<Reduction>(`${this.URL}${produitID}/reduction/${id}`);
  }
}
