import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateContactComponent } from './create-contact/create-contact.component';
import { ThankYouContactComponent } from './thankyou-contact/thankyou-contact.component';


const routes: Routes = [
  { path: 'contact', component: CreateContactComponent },
  { path: 'thankyou', component: ThankYouContactComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
