import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../shared/models/contact';

@Injectable({
  providedIn: "root"
})
export class ContactService {

  constructor(private http: HttpClient) {}

  addContact(contact: Contact): Observable<Contact> {
    const url = `${environment.apiUrl}/contact`;
    return this.http.post<Contact>(url, contact);
  }

  getListContact(): Observable<Contact[]> {
    const url = `${environment.apiUrl}/contact`;
    return this.http.get<Contact[]>(url);
  }


}
