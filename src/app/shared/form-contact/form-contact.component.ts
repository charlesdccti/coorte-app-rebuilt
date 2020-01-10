import { Contact } from './../models/contact';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.scss']
})
export class FormContactComponent {

  @Input() contact: Contact = <Contact>{};
  @Output() outputcontact: EventEmitter<Contact> = new EventEmitter();

  constructor() {}

  onSubmit() {
    this.outputcontact.emit(this.contact);
    console.log(this.contact);
  }
}
