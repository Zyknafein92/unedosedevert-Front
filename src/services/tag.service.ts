import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {Tag} from '../model/tag.model';
import {ServicePartage} from './service.partage';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private URL = '/api/produits/tag';

  constructor(private http: HttpClient, private servicePartage: ServicePartage) {
    this.URL = servicePartage.BACKEND_URL + this.URL;
  }

  getTags(): Observable<Array<Tag>> {
    return this.http.get<Array<Tag>>(this.URL);
  }

  getTag(id: number): Observable<Tag> {
    return this.http.get<Tag>(`${this.URL}/${id}`);
  }

  getTagPage(page: number, size: number, sort: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/xxx?page=${page}&size=${size}&sort=${sort}`);
  }

  createTag(form: FormGroup): Observable < Tag> {
    console.log('form:', form.value);
    return this.http.post<Tag>(this.URL, form.value);
  }

  updateTag(form: FormGroup): Observable<Tag> {
    return this.http.put<Tag>(`${this.URL}`, form.value);
  }

  deleteTag(id: number): Observable<Tag> {
    return this.http.delete<Tag>(`${this.URL}/${id}`);
  }
}
