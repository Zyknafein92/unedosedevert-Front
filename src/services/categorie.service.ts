import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Categorie} from '../model/categorie.model';
import {FormGroup} from '@angular/forms';
import {ServicePartage} from './service.partage';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private URL = '/api/produits/categories';

  constructor(private http: HttpClient, private servicePartage: ServicePartage) {
    this.URL = servicePartage.BACKEND_URL + this.URL;
  }

  getCategories(): Observable<Array<Categorie>> {
    return this.http.get<Array<Categorie>>(`${this.URL}`);
  }

  getCategoriePage(page: number, size: number, sort: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/categories?page=${page}&size=${size}&sort=${sort}`);
  }

  getCategorie(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.URL}/${id}`);
  }

  createCategorie(form: FormGroup): Observable < Categorie> {
    return this.http.post<Categorie>(this.URL, form.value);
  }

  updateCategorie(form: FormGroup): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.URL}`, form.value);
  }

  deleteCategorie(id: number): Observable<Categorie> {
    return this.http.delete<Categorie>(`${this.URL}/${id}`);
  }
}
