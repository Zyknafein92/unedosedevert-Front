import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {FormGroup} from '@angular/forms';
import {TagsCategorie} from '../model/tags-categorie.model';

@Injectable({
  providedIn: 'root'
})
export class TagscategorieService {
  private URL = 'http://localhost:8080/api/produits/tagsCategories';

  constructor(private http: HttpClient) { }

  getTagsCategories(): Observable<Array<TagsCategorie>> {
    return this.http.get<Array<TagsCategorie>>(this.URL);
  }

  getTagsCategorie(id: number): Observable<TagsCategorie> {
    return this.http.get<TagsCategorie>(`${this.URL}/${id}`);
  }

  getTagsCategoriePage(page: number, size: number, sort: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/xxx?page=${page}&size=${size}&sort=${sort}`);
  }

  createTagsCategorie(form: FormGroup): Observable <TagsCategorie> {
    console.log('form:', form.value);
    return this.http.post<TagsCategorie>(this.URL, form.value);
  }

  updateTagsCategorie(form: FormGroup): Observable<TagsCategorie> {
    return this.http.put<TagsCategorie>(`${this.URL}`, form.value);
  }

  deleteTagsCategorie(id: number): Observable<TagsCategorie> {
    return this.http.delete<TagsCategorie>(`${this.URL}/${id}`);
  }
}
