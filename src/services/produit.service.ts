import { Injectable } from '@angular/core';
import {Produit} from '../model/produit.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpParams} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {SearchCriteria} from '../model/search-criteria';
import {SortDirection} from '@angular/material/sort';



@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private URL = 'http://localhost:8080/api/produits';

  searchCriteria: SearchCriteria;

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Array<Produit>> {
    return this.http.get<Array<Produit>>(this.URL);
  }

  getProduitPage(page: number, size: number, sort: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/xxx?page=${page}&size=${size}&sort=${sort}`);
  }

  // tslint:disable-next-line:max-line-length
  getProduitsBySearch(searchCriteria: SearchCriteria, page: number, size: number, sort: string): Observable<any> {
    let customParam = new HttpParams();
    if (searchCriteria.type != null) {
      customParam = customParam.set('type', searchCriteria.type);
    }
    if (searchCriteria.categorie != null) {
      customParam = customParam.set('categorie', searchCriteria.categorie);
    }
    if (searchCriteria.query != null) {
      customParam = customParam.set('query', searchCriteria.query);
    }
    console.log('Service:', customParam);
    return this.http.get<Array<Produit>>(`${this.URL}/search?page=${page}&size=${size}&sort=${sort}`, {params: customParam});
  }


  getProduit(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.URL}/${id}`);
  }

  createProduit(form: FormGroup): Observable <FormGroup> {
    console.log('forms to create:', form.value);
    return this.http.post<FormGroup>(this.URL, form.value);
  }

  updateProduit(form: FormGroup): Observable<FormGroup> {
    return this.http.put<FormGroup>(`${this.URL}`, form.value);
  }

  deleteProduit(id: number): Observable<Produit> {
    return this.http.delete<Produit>(`${this.URL}/${id}`);
  }
}
