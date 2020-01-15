import { Contact } from './../../shared/models/contact';
import { ContactService } from './../../services/contact.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: "app-create-contact",
  templateUrl: "./create-contact.component.html",
  styleUrls: ["./create-contact.component.scss"]
})
export class CreateContactComponent {
  erro = null;
  resultadoIMC: string = null;
  user: Contact;

  constructor(
    private http: HttpClient,
    private contactService: ContactService,
    private router: Router
  ) {}

  addContact(contact: Contact) {
    // console.log(contact);
    this.user = contact;
    this.contactService.getTextMsgIMC(contact).subscribe(
      res => this.resultadoIMC = res
    );
    console.log(this.resultadoIMC);


    this.contactService.addContactUser(contact).subscribe(
      // () => { this.router.navigateByUrl("/listcontact");}
      dados => this.user = dados
      ,
      err => {
        this.erro = err;
        // alert(this.erro.error.message);
        console.error(err);
      }
    );
  }
}
