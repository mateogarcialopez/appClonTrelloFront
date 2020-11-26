import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  url: string = 'http://localhost:3000/api';
  constructor(private _http: HttpClient) {

  }

  crearUsuario(user): Observable<any> {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.post(`${this.url}/addUser`, body, { headers: headers });
  }

  login(data): Observable<any> {
    let body = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.post(`${this.url}/login`, body, { headers: headers });
  }

  loginWithGoogle(token): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('authorization', token);
    return this._http.get(`${this.url}/loginGoogle`, { headers: headers });
  }


}
