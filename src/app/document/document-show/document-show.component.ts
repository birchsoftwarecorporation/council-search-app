import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-show',
  templateUrl: './document-show.component.html',
  styleUrls: ['./document-show.component.css']
})
export class DocumentShowComponent implements OnInit {

  isPageLoading = true; // TODO - make this a component
  success: boolean;

  // TODO - Migrate to model
  uuid: string;
  errorMsg: string;
  stateAbbr: string;
  regionName: string;
  monitorURL: string;
  dateCreated: Date;
  meetingDate: Date;
  lastModified: Date;
  title: string;
  url: string;
  content: string;
  documentType: string;

  constructor(private actRoute: ActivatedRoute, private documentService: DocumentService, private toastr: ToastrService) {
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
      if(data.uuid != null){
        this.uuid = data.uuid;
        this.stateAbbr = data.stateAbbr;
        this.regionName = data.regionName;
        this.monitorURL = data.monitorURL;
        this.dateCreated = new Date(data.dateCreated);
        this.meetingDate = new Date(data.meetingDate);
        this.lastModified = new Date(data.lastModified);
        this.title = data.title;
        this.url = data.url;
        this.content = data.content;
        this.documentType = data.documentType;
        this.success = true;
      }else{
        this.errorMsg = "Could not load document";
        this.success = false;
      }
      this.isPageLoading = false;
    },(error) => {
      console.log(error);
      this.errorMsg = "Could not load document";
      this.isPageLoading = false;
      this.success = false;
    });
  }

  downloadPDF(){
    this.toastr.success("Preparing download...", "Document", { timeOut: 60000 });

    this.documentService.pdf(this.uuid).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = this.uuid+".pdf";
      a.click();
      URL.revokeObjectURL(objectUrl);
      this.toastr.success("Download Complete");
    },(error) => {
      this.toastr.error("Could not download document");
    })
  }

}
