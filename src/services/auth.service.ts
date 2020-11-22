import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {JwtResponse} from './security/JwtReponse';
import {AuthLoginInfo} from './security/login-info';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:8080/api/login';


  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    console.log(credentials);
    return this.http.post<JwtResponse>(this.URL, credentials, httpOptions);
  }
}
