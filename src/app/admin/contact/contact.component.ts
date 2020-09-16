import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Contact } from '../models/contact'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent{

  contact = new Contact();
  errorMsg: string;

  constructor(private router: Router, private adminService: AdminService) { }

  sendContact(){
    this.contact.type = "contact";

    this.adminService.postContact(this.contact).subscribe(data => {
      if (data == undefined) {
        this.errorMsg = data['Error'];
      } else {
        console.log(data);
      }
    })

    this.router.navigate(['/thankyou']);
  }

}
