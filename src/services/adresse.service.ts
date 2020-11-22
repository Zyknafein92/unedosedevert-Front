import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Adresse} from '../model/adresse.model';
import {Commande} from '../model/commande.model';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  private URL = 'http://localhost:8080/api/user/address';

  constructor(private http: HttpClient) { }

  getAdresse(id: number): Observable<Adresse> {
    return this.http.get<Adresse>(`${this.URL}/${id}`);
  }

    createAdresse(adresse: FormGroup): Observable<Adresse> {
    return this.http.post<Adresse>(this.URL, adresse);
  }

  updateAdresse(adresse: FormGroup): Observable<Adresse> {
    return this.http.put<Adresse>(`${this.URL}`, adresse);
  }

  deleteAdresse(id: number): Observable<Adresse> {
    return this.http.delete<Adresse>(`${this.URL}/${id}`);
  }
}
