import { Injectable } from '@angular/core';
import {Produit} from '../model/produit.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {SearchCriteria} from '../model/search-criteria';



@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private URL = 'http://localhost:8080/api/produits';
  private adminURL = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Array<Produit>> {
    return this.http.get<Array<Produit>>(this.URL);
  }

  getProduitPage(page: number, size: number, sort: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/xxx?page=${page}&size=${size}&sort=${sort}`);
  }

  findProductByCriteria(searchCriteria: SearchCriteria): Observable<Array<Produit>> {
    let customParam = new HttpParams();
    if (searchCriteria && searchCriteria.tag != null) {
      customParam = customParam.set('tag', searchCriteria.tag);
    }
    if (searchCriteria && searchCriteria.categorie != null) {
      customParam = customParam.set('categorie', searchCriteria.categorie);
    }
    if (searchCriteria && searchCriteria.sousCategorie != null) {
      customParam = customParam.set('sousCategorie', searchCriteria.sousCategorie);
    }
    if (searchCriteria && searchCriteria.query != null) {
      customParam = customParam.set('query', searchCriteria.query);
    }
    console.log('Service:', customParam);
    return this.http.post<Array<Produit>>(`${this.URL}/search`, searchCriteria, {params: customParam});
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

  uploadPhoto(file: File): Observable<any> {
    const headers = new HttpHeaders().set('responseType', 'text');
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(`${this.adminURL}/upload`, formData, {
      headers
    });
  }
}
