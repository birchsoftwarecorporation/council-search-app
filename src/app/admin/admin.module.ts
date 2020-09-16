import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [HomeComponent, ThankyouComponent, ContactComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    AdminRoutingModule
  ], exports: [ // FYI - https://stackoverflow.com/questions/60221876/angular-material-not-working-in-angular-version-9
    MatAutocompleteModule,
    MatInputModule
  ]
})
export class AdminModule { }
