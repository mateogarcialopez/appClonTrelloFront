import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  public url = 'http://localhost:3000/api'
  constructor(private _http: HttpClient) {

  }

  getNotes(token): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('authorization', token);
    return this._http.get(`${this.url}/getNotes`, { headers: headers });
  }

  

}
