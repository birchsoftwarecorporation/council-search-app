import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentShowComponent } from './document-show/document-show.component';


@NgModule({
  declarations: [DocumentShowComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule
  ]
})
export class DocumentModule { }
