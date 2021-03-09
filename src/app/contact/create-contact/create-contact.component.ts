import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

import { ContactService } from '../contact.service';
import { Contact } from '../models/contact.model'

@Component({
  selector: 'app-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  contact = new Contact();
  errorMsg: string;

  constructor(private router: Router, private contactService: ContactService, private titleService: Title, private metaTagService: Meta) { }

  ngOnInit() {
    this.titleService.setTitle("Contact Us");
    this.metaTagService.updateTag(
      { name: 'description', content: 'Contact us about our nightly monitoring service, to add a new city or just general questions' }
    );
  }


  sendContact(){
    this.contact.type = "contact";

    this.contactService.postContact(this.contact).subscribe(data => {
      if (data == undefined) {
        this.errorMsg = data['Error'];
      } else {
        console.log(data);
      }
    })

    this.router.navigate(['/contact/thankyou']);
  }

}
