import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {FormGroup} from '@angular/forms';
import {Label} from '../model/label';


@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private URL = 'http://localhost:8080/api/produits/label';
  private adminURL = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

  getLabels(): Observable<Array<Label>> {
    return this.http.get<Array<Label>>(this.URL);
  }

  getLabel(id: number): Observable<Label> {
    return this.http.get<Label>(`${this.URL}/${id}`);
  }

  getLabelPage(page: number, size: number, sort: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/xxx?page=${page}&size=${size}&sort=${sort}`);
  }

  createLabel(form: FormGroup): Observable <Label> {
    console.log('form:', form.value);
    return this.http.post<Label>(this.URL, form.value);
  }

  updateLabel(form: FormGroup): Observable<Label> {
    return this.http.put<Label>(`${this.URL}`, form.value);
  }

  deleteLabel(id: number): Observable<Label> {
    return this.http.delete<Label>(`${this.URL}/${id}`);
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
