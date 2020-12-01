import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ContactRoutingModule } from './contact-routing.module';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { ThankYouContactComponent } from './thankyou-contact/thankyou-contact.component';


@NgModule({
  declarations: [CreateContactComponent, ThankYouContactComponent],
  imports: [
    CommonModule,
    FormsModule,
    ContactRoutingModule
  ]
})
export class ContactModule { }
