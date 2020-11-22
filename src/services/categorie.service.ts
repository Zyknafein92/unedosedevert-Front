import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Categorie} from '../model/categorie.model';
import {FormGroup} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private URL = 'http://localhost:8080/api/produits/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Array<Categorie>> {
    return this.http.get<Array<Categorie>>(this.URL);
  }

  getCategorie(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.URL}/${id}`);
  }

  createCategorie(form: FormGroup): Observable < Categorie> {
    console.log('categorie', form.value);
    return this.http.post<Categorie>(this.URL, form.value);
  }

  updateCategorie(form: FormGroup): Observable<Categorie> {
    console.log('categorie', form.value);
    return this.http.put<Categorie>(`${this.URL}`, form.value);
  }

  deleteCategorie(id: number): Observable<Categorie> {
    return this.http.delete<Categorie>(`${this.URL}/${id}`);
  }
}
