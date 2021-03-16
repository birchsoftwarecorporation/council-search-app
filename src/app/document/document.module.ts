import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
 
import { DocumentRoutingModule } from './document-routing.module';
import { DocumentShowComponent } from './document-show/document-show.component';
import { DownloadDialogComponent } from './download-dialog/download-dialog.component'


@NgModule({
  declarations: [DocumentShowComponent, DownloadDialogComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDialogModule
  ],
  entryComponents: [DownloadDialogComponent]
})
export class DocumentModule { }
