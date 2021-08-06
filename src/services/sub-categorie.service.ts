import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubCategorie} from '../model/sub-categorie';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {ServicePartage} from './service.partage';

@Injectable({
  providedIn: 'root'
})
export class SubCategorieService {
  private URL = '/api/produits/sousCategorie';

  constructor(private http: HttpClient, private servicePartage: ServicePartage) {
    this.URL = servicePartage.BACKEND_URL + this.URL;
  }

  getSubCategories(): Observable<Array<SubCategorie>> {
    return this.http.get<Array<SubCategorie>>(this.URL);
  }

  getSubCategorie(id: number): Observable<SubCategorie> {
    return this.http.get<SubCategorie>(`${this.URL}/${id}`);
  }

  getSubCategoriePage(page: number, size: number, sort: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/xxx?page=${page}&size=${size}&sort=${sort}`);
  }

  createSubCategorie(form: FormGroup): Observable <SubCategorie> {
    console.log('form:', form.value);
    return this.http.post<SubCategorie>(this.URL, form.value);
  }

  updateSubCategorie(form: FormGroup): Observable<SubCategorie> {
    return this.http.put<SubCategorie>(`${this.URL}`, form.value);
  }

  deleteSubCategorie(id: number): Observable<SubCategorie> {
    return this.http.delete<SubCategorie>(`${this.URL}/${id}`);
  }
}
