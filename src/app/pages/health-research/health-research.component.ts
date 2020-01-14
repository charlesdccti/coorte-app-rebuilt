import { getTestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';
import { Contact } from 'src/app/shared/models/contact';

@Component({
  selector: "app-health-research",
  templateUrl: "./health-research.component.html",
  styleUrls: ["./health-research.component.scss"]
})
export class HealthResearchComponent {
  @Input() contact: Contact = <Contact>{};
  erro = null;
  imc;
  obsTextMsg: Observable<string>;

  constructor(
    private http: HttpClient,
    private contactService: ContactService,
    private router: Router
  ) {}

  onSubmit() {
    // this.addContact(this.contact);

    // this.getCalculoIMC().subscribe(
    //   resultado => (this.imc = resultado),
    //   erro => console.log(erro)
    // );
    //this.imc = this.getCalculoIMC()
    this.getTextMsg();
  }

  getCalculoIMC() {
    const url = `${environment.apiUrl}/imc/${this.contact.peso}/altura/${this.contact.altura}`;
    this.http.get<string>(url).subscribe(dado => (this.imc = dado));

    console.log(this.imc);
  }



  getTextMsg() {
    //this.obsTextMsg = this.writerService.getTextMsg();
    this.contactService.getTextMsg(this.contact).subscribe(
      //msg => console.log(msg)
      msg => this.imc = msg
    );
  }
}
