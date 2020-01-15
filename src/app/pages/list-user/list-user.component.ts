import { ContactService } from 'src/app/services/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-list-user",
  templateUrl: "./list-user.component.html",
  styleUrls: ["./list-user.component.scss"]
})
export class ListUserComponent {

  users;
  userInscricao: any;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.userInscricao = this.contactService.getListUser().subscribe(
      dados => (this.users = dados),
      erro => console.log(erro)
    );
    console.log(this.users);
  }

  ngOnDestroy() {
    this.userInscricao.unsubscribe();
  }
}
