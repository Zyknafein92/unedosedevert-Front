import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {FormGroup} from '@angular/forms';
import {Type} from '../model/type.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private URL = 'http://localhost:8080/api/produits/types';

  constructor(private http: HttpClient) { }

  getTypes(): Observable<Array<Type>> {
    return this.http.get<Array<Type>>(this.URL);
  }

  getType(id: number): Observable<Type> {
    return this.http.get<Type>(`${this.URL}/${id}`);
  }

  createType(form: FormGroup): Observable < Type> {
    console.log('form:', form.value);
    return this.http.post<Type>(this.URL, form.value);
  }

  updateType(form: FormGroup): Observable<Type> {
    return this.http.put<Type>(`${this.URL}`, form.value);
  }

  deleteType(id: number): Observable<Type> {
    return this.http.delete<Type>(`${this.URL}/${id}`);
  }
}
