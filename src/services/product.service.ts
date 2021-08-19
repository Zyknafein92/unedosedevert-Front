import { Injectable } from '@angular/core';
import {Product} from '../model/product.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {SearchCriteria} from '../model/search-criteria';
import {ServicePartage} from './service.partage';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private URL = '/api/produits';
  private adminURL = '/api/admin';

  constructor(private http: HttpClient, private servicePartage: ServicePartage) {
    this.URL = servicePartage.BACKEND_URL + this.URL;
    this.adminURL = servicePartage.BACKEND_URL + this.adminURL;
  }

  getProduits(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.URL);
  }

  getProduitPage(page: number, size: number, sort: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/xxx?page=${page}&size=${size}&sort=${sort}`);
  }

  findProductByCriteria(searchCriteria: SearchCriteria): Observable<Array<Product>> {
    console.log('sc', searchCriteria);
    return this.http.post<Array<Product>>(`${this.URL}/search`, searchCriteria);
  }


  getProduit(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.URL}/${id}`);
  }

  createProduit(form: FormGroup): Observable <FormGroup> {
    console.log('forms to create:', form.value);
    return this.http.post<FormGroup>(this.URL, form.value);
  }

  updateProduit(form: FormGroup): Observable<FormGroup> {
    return this.http.put<FormGroup>(`${this.URL}`, form.value);
  }

  deleteProduit(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.URL}/${id}`);
  }

  uploadPicture(file: File): Observable<any> {
    const headers = new HttpHeaders().set('responseType', 'text');
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(`${this.adminURL}/upload`, formData, {
      headers
    });
  }
}
