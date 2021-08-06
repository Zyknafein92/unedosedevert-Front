import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';
import {FormControl, FormGroup} from '@angular/forms';
import {ServicePartage} from './service.partage';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private URL = '/api/user';

  constructor(private http: HttpClient, private servicePartage: ServicePartage) {
    this.URL = servicePartage.BACKEND_URL + this.URL;
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.URL);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.URL}/${id}`);
  }

  getUserByToken(token: string): Observable<User> {
    let params = new HttpParams().set("token", token);

    return this.http.get<User>(`${this.URL}/forgot-password`, {params })
    //return this.http.get<User>(`${this.URL}/myprofil`);
  }

  getMyProfil(): Observable<User> {
    return this.http.get<User>(`${this.URL}/myprofil`);
  }

  createUser(form: FormGroup): Observable<User> {
    return this.http.post<User>(this.URL, form.value);
  }

  updateUser(form: FormGroup): Observable<User> {
    return this.http.put<User>(`${this.URL}`, form.value);
  }

  updateUserPassword(id: number, password: string) {
    return this.http.put<User>(`${this.URL}/reset-password/${id}`, password);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.URL}/${id}`);
  }

  forgetPassword(form: FormGroup) {
    const params = new HttpParams()
      .set('email', form.get('email').value);
   console.log(params)
    return this.http.post<void>(`${this.URL}/forgetPassword`, params);
  }
}
