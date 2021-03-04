import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Meta, Title} from '@angular/platform-browser';

import { DocumentService } from '../document.service';
import { Document } from '../models/document.model';
import {ContactService} from '../../contact/contact.service';

@Component({
  selector: 'app-document-show',
  templateUrl: './document-show.component.html',
  styleUrls: ['./document-show.component.css']
})
export class DocumentShowComponent implements OnInit {

  uuid: string;
  document: Document;

  // Display Stuff
  isPageLoading = true; // TODO - make this a component
  errorMsg: string;
  success: boolean;

  constructor(private actRoute: ActivatedRoute, private documentService: DocumentService, private toastr: ToastrService, private titleService: Title, private metaTagService: Meta) {
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
    this.documentService.get(this.uuid).subscribe(data => {
      if (data == undefined || data == null) {
        console.log(data['Error']);
        this.errorMsg = "Could not load document";
        this.success = false;
        this.isPageLoading = false;
      } else {
        this.document.build(data);

        // Meta data try
        this.titleService.setTitle(this.document.title);
        this.metaTagService.updateTag(
          { name: 'description', content: this.document.getSnippet(155) }
        );
        this.isPageLoading = false;
        this.success = true;
      }
    },(error) => {
      console.log(error);
      this.errorMsg = "Could not load document";
      this.isPageLoading = false;
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
