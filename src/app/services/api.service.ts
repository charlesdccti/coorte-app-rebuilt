import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  uri = 'http://localhost:4000/business';
  url_univariada =  'http://localhost:4000/univariada';

  constructor(private http: HttpClient) { }

  getBusinesses() {
    return this.http.get(`${this.uri}`);
  }

  getUnivariada(codVar) {
    return this
            .http
            .get(`${this.url_univariada}/${codVar}`);
    }

}
