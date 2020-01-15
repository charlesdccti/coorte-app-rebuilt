import { HttpClient } from '@angular/common/http';
import { Mongo } from './../../shared/models/mongo';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-dictionary",
  templateUrl: "./dictionary.component.html",
  styleUrls: ["./dictionary.component.scss"]
})
export class DictionaryComponent {
  erro = null;
  obsTextMsg: Observable<string>;

  chave: Number;
  valor: String;
  mongo: Mongo = <Mongo>{};
  mongoInscricao: any;
  mongodb = null;
  resultado;
  cidadeList: Mongo[];

  constructor(
    private http: HttpClient,
    private contactService: ContactService,
    private router: Router
  ) {}

  onSubmit() {
    // this.addMongo(this.mongo);
    this.loadCidades();
    this.getValorByChave(this.mongo.chave);
  }

  loadCidades() {
    this.mongoInscricao = this.contactService.loadCidades().subscribe(
      dados => (this.cidadeList = dados),
      erro => console.log(erro)
    );
  }

  getValorByChave(chave: Number) {
    // test
    this.contactService
      .getValorByChaveDictionary(chave)
      .subscribe(retorno => (this.resultado = retorno));
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
