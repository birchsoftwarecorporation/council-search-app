import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ContactService } from '../contact.service';
import { Contact } from '../models/contact.model'

@Component({
  selector: 'app-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent{

  contact = new Contact();
  errorMsg: string;

  constructor(private router: Router, private contactService: ContactService) { }

  sendContact(){
    this.contact.type = "contact";

    this.contactService.postContact(this.contact).subscribe(data => {
      if (data == undefined) {
        this.errorMsg = data['Error'];
      } else {
        console.log(data);
      }
    })

    this.router.navigate(['/thankyou']);
  }

}
