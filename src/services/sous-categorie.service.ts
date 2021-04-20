import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SousCategorie} from '../model/sous-categorie';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {ServicePartage} from './service.partage';

@Injectable({
  providedIn: 'root'
})
export class SousCategorieService {
  private URL = '/api/produits/sousCategorie';

  constructor(private http: HttpClient, private servicePartage: ServicePartage) {
    this.URL = servicePartage.BACKEND_URL + this.URL;
  }

  getSousCategories(): Observable<Array<SousCategorie>> {
    return this.http.get<Array<SousCategorie>>(this.URL);
  }

  getSousCategorie(id: number): Observable<SousCategorie> {
    return this.http.get<SousCategorie>(`${this.URL}/${id}`);
  }

  getSousCategoriePage(page: number, size: number, sort: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/xxx?page=${page}&size=${size}&sort=${sort}`);
  }

  createSousCategorie(form: FormGroup): Observable <SousCategorie> {
    console.log('form:', form.value);
    return this.http.post<SousCategorie>(this.URL, form.value);
  }

  updateSousCategorie(form: FormGroup): Observable<SousCategorie> {
    return this.http.put<SousCategorie>(`${this.URL}`, form.value);
  }

  deleteSousCategorie(id: number): Observable<SousCategorie> {
    return this.http.delete<SousCategorie>(`${this.URL}/${id}`);
  }
}
