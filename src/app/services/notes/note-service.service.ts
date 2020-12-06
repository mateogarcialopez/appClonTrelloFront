import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  public url = 'http://localhost:3000/api'
  constructor(private _HttpClient: HttpClient) {

  }

  getNotes(token): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('authorization', token);
    return this._HttpClient.get(`${this.url}/getNotes`, { headers: headers });
  }

  getNote(idNote, token): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('authorization', token);
    return this._HttpClient.get(`${this.url}/getNote/${idNote}`, { headers: headers });
  }

  updateNote(titulo, descripcion, img, id, token): Observable<any> {
    let fd = new FormData();
    fd.append('titulo', titulo);
    fd.append('descripcion', descripcion);
    fd.append('img', img);

    let headers = new HttpHeaders().set('authorization', token);
    return this._HttpClient.post(`${this.url}/updateNote/${id}`, fd, { headers: headers });
  }

  addNote(body, token): Observable<any> {
    let fm = new FormData();
    fm.append('titulo', body.titulo);
    fm.append('descripcion', body.descripcion);
    fm.append('img', body.img);
    let headers = new HttpHeaders().set('authorization', token);
    return this._HttpClient.post(`${this.url}/addNote`, fm, { headers: headers });
  }


}
