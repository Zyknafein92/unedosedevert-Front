import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {Type} from '../model/type.model';
import {ServicePartage} from './service.partage';


@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private URL = '/api/produits/type';

  constructor(private http: HttpClient, private servicePartage: ServicePartage) {
    this.URL = servicePartage.BACKEND_URL + this.URL;
  }

  getTypes(): Observable<Array<Type>> {
    return this.http.get<Array<Type>>(this.URL);
  }

  getType(id: number): Observable<Type> {
    return this.http.get<Type>(`${this.URL}/${id}`);
  }

  getTypePage(page: number, size: number, sort: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/types?page=${page}&size=${size}&sort=${sort}`);
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
