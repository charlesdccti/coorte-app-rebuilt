import { Mongo } from './../../shared/models/mongo';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/shared/models/contact';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-mock-mongodb",
  templateUrl: "./mock-mongodb.component.html",
  styleUrls: ["./mock-mongodb.component.scss"]
})
export class MockMongodbComponent {
  erro = null;
  obsTextMsg: Observable<string>;

  chave: Number;
  valor: String;
  mongo: Mongo = <Mongo>{};
  mongoInscricao: any;
  mongodb = null;

  constructor(
    private http: HttpClient,
    private contactService: ContactService,
    private router: Router
  ) {}

  onSubmit() {
    this.addMongo(this.mongo);

    //this.getValorByChave(this.chave);
  }

  getValorByChave(chave: Number) {
    // test
    this.contactService
      .getValorByChave(chave)
      .subscribe(retorno => (this.valor = retorno));
  }

  addMongo(mongo: Mongo) {
    console.log(mongo);
    this.contactService.addMongo(mongo).subscribe(
      retorno => {
        this.mongo = retorno;
        this.onClickMe();
      },
      err => {
        this.erro = err;
        // alert(this.erro.error.message);
        console.error(err);
      }
    );

    this.mongoInscricao = this.contactService.getListMongoDB().subscribe(
      dados => (this.mongodb = dados),
      erro => console.log(erro)
    );
  }

  onClickMe() {
        this.mongoInscricao = this.contactService.getListMongoDB().subscribe(
          dados => (this.mongodb = dados),
          erro => console.log(erro)
        );
  }
}
