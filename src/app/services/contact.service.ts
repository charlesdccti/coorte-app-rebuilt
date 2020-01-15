import { Mongo } from './../shared/models/mongo';
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

  apiUrl = "http://localhost:8080/api/v1/";

  addContact(contact: Contact): Observable<Contact> {
    const url = `${environment.apiUrl}/contact`;
    return this.http.post<Contact>(url, contact);
  }

  addContactUser(contact: Contact): Observable<Contact> {
    const url = `${this.apiUrl}/user`;
    return this.http.post<Contact>(url, contact);
  }

  getListUser(): Observable<Contact[]> {
    const url = `${this.apiUrl}/user/all`;
    console.log(url);
    return this.http.get<Contact[]>(url);
  }

  getListContact(): Observable<Contact[]> {
    const url = `${environment.apiUrl}/contact`;
    return this.http.get<Contact[]>(url);
  }

  // ============================

  getCalculoIMC(contact: Contact): Observable<Contact[]> {
    const url = `${environment.apiUrl}/imc/${contact.peso}/altura/${contact.altura}`;
    return this.http.get<Contact[]>(url);
  }

  getTextMsgIMC(contact: Contact): Observable<string> {
    const url = `${this.apiUrl}/imc/${contact.peso}/altura/${contact.altura}`;
    console.log(url);
    return this.http.get(url, { responseType: "text" });
  }

  getTextMsg(contact: Contact): Observable<string> {
    const url = `${environment.apiUrl}/imc/${contact.peso}/altura/${contact.altura}`;
    return this.http.get(url, { responseType: "text" });
  }

  getValorByChave(chave: Number): Observable<string> {
    const url = `${environment.apiUrl}/mongodb/${chave}`;
    return this.http.get(url, { responseType: "text" });
  }

  addMongo(mongo: Mongo): Observable<Mongo> {
    const url = `${environment.apiUrl}/mongodb`;
    return this.http.post<Mongo>(url, mongo);
  }

  getListMongoDB(): Observable<Mongo[]> {
    const url = `${environment.apiUrl}/mongodb`;
    return this.http.get<Mongo[]>(url);
  }

  getValorByChaveDictionary(chave: Number): Observable<string> {
    const url = `http://localhost:8080/api/v1/dictionary/${chave}`;
    console.log(chave);
    console.log(url);
    return this.http.get(url, { responseType: "text" });
  }

  loadCidades(): Observable<Mongo[]> {
    const url = `${this.apiUrl}/dictionary/load`;
    return this.http.get<Mongo[]>(url);
  }
}
