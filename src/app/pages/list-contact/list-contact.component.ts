import { ContactService } from './../../services/contact.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: "app-list-contact",
  templateUrl: "./list-contact.component.html",
  styleUrls: ["./list-contact.component.scss"]
})
export class ListContactComponent implements OnInit, OnDestroy {

  contacts;
  contactInscricao;

  constructor(private contactService: ContactService) {}

  ngOnInit() {

    this.contactInscricao = this.contactService.getListContact().subscribe(
      dados => (this.contacts = dados),
      erro => console.log(erro)
    );
  }

  ngOnDestroy() {
    this.contactInscricao.unsubscribe();
  }
}

