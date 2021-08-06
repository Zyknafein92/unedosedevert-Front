import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Adress} from '../model/adress.model';
import {FormGroup} from '@angular/forms';
import {ServicePartage} from './service.partage';

@Injectable({
  providedIn: 'root'
})
export class AdressService {

  private URL = '/api/user/address';

  constructor(private http: HttpClient, private servicePartage: ServicePartage) {
    this.URL = servicePartage.BACKEND_URL + this.URL;
  }

  getAdresse(id: number): Observable<Adress> {
    return this.http.get<Adress>(`${this.URL}/${id}`);
  }

    createAdresse(adresse: FormGroup): Observable<Adress> {
    return this.http.post<Adress>(this.URL, adresse.value);
  }

  updateAdresse(adresse: FormGroup): Observable<Adress> {
    return this.http.put<Adress>(`${this.URL}`, adresse.value);
  }

  deleteAdresse(id: number): Observable<Adress> {
    return this.http.delete<Adress>(`${this.URL}/${id}`);
  }
}
