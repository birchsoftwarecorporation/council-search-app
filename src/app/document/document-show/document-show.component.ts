import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DocumentService } from '../document.service';
import { Document } from '../models/document.model';
import {Event} from '../../event/models/event.model';
import {Alert} from '../../alert/models/alert.model';

@Component({
  selector: 'app-document-show',
  templateUrl: './document-show.component.html',
  styleUrls: ['./document-show.component.css']
})
export class DocumentShowComponent implements OnInit {

  uuid: string;
  document: Document;

  // Display Stuff
  // isPageLoading = true; // TODO - make this a component
  errorMsg: string;
  success: boolean;

  constructor(private actRoute: ActivatedRoute, private documentService: DocumentService, private toastr: ToastrService) {
    this.document = new Document();

    // Grab it from the active route
    this.uuid = this.actRoute.snapshot.params.uuid;

    if(this.uuid == null){
      // grab it from hash
      this.actRoute.fragment.subscribe((fragment: string) => {
        this.uuid = fragment;
      })
    }

  }

  ngOnInit(): void {
    // Get the document data
    // Parse the results
    this.documentService.get(this.uuid).subscribe(data => {
      if (data == undefined || data == null) {
        console.log(data['Error']);
        this.errorMsg = "Could not load document";
        this.success = false;
      } else {
        this.document.build(data);
        this.success = true;
      }
      // this.isPageLoading = false;
    },(error) => {
      console.log(error);
      this.errorMsg = "Could not load document";
      // this.isPageLoading = false;
      this.success = false;
    });
  }

  downloadPDF(){
    this.toastr.info("Preparing download...", "Document", { timeOut: 60000 });

    this.documentService.pdf(this.uuid).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = this.uuid+".pdf";
      a.click();
      URL.revokeObjectURL(objectUrl);
      this.toastr.success("Downloading", "Document", { timeOut: 60000 });
    },(error) => {
      this.toastr.error("Could not download document");
    })
  }

}
