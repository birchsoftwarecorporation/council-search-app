import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Meta, Title} from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import {debounceTime, filter, finalize, switchMap, tap} from 'rxjs/operators';

import { SearchService } from '../../search/search.service';
import { Suggestion } from '../../search/models/suggestion';
import { DocumentService } from '../document.service';
import { Document } from '../models/document.model';
import { DownloadDialogComponent } from '../download-dialog/download-dialog.component';
import { ContactService } from '../../contact/contact.service';
import { Contact } from '../../contact/models/contact.model'

@Component({
    selector: 'app-document-show',
    templateUrl: './document-show.component.html',
    styleUrls: ['./document-show.component.css']
})
export class DocumentShowComponent implements OnInit {

    // Search
    q = new FormControl();
    suggestions = new Array<Suggestion>();
    isSuggestLoading = false;

    uuid: string;
    document: Document;

    // Display Stuff
    isPageLoading = true; // TODO - make this a component
    errorMsg: string;
    success: boolean;

    documentSearchTerm: string = "";
    documentOriginalContent: string = "";
    documentTextHighlighted: boolean = false;

    constructor(
        private router: Router,
        private actRoute: ActivatedRoute,
        private searchService: SearchService,
        private documentService: DocumentService,
        private toastr: ToastrService,
        private titleService: Title,
        private metaTagService: Meta,
        public dialog: MatDialog,
        private contactService: ContactService
    ) {
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

        // Suggestions
        this.q.valueChanges.pipe(
            debounceTime(500), // Wait for the person to type
            tap(() => { // Reset errors
                this.suggestions = [];
            }),
            filter(value => value.length > 2), // Min 3 chars for suggestions
            tap(() => { // set the loading now that we are going to do work
                this.isSuggestLoading = true;
            }),
            switchMap(value => this.searchService.getSuggestions(value, 10)
                .pipe(
                    finalize(() => {
                        this.isSuggestLoading = false
                    })
                )
            ) // Grab the new data
        ).subscribe(data => { // Subscribe to it or some bullshit jargon
            if (data == undefined) {
                // this.errorMsg = data['Error'];
                this.suggestions = [];
            } else {
                this.suggestions = data.map(item => {
                    return new Suggestion(item.name); // Create new model for list
                });
            }
        });

    }

    downloadPDF(){
      const downloadDialogRef = this.dialog.open(DownloadDialogComponent, {
        autoFocus: true,
        restoreFocus: false
      });

      downloadDialogRef.afterClosed().subscribe(result => {
        if(result && result.action === "ok") {
          // TODO: To be replaced with actual logic for utilizing user download info
          const contact = result.contact;

          // Add some extras
          contact.type = "download";
          contact.message = this.uuid;

          console.log("User download contact: ", result.contact);

          // Start the download process
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


          // Send the contact data
          this.contactService.postContact(contact).subscribe(data => {
            if (data == undefined) {
              console.log(data['Error']);
            } else {
              // console.log(data);
            }
          })
        }
      });
    }

    search(){
        // console.log("searching: "+this.q.value);
        this.router.navigate(['/search'], { queryParams: { q: this.q.value } });
    }

    suggestClick(suggestion){
        // console.log("suggestion: "+suggestion);
        this.q.setValue(suggestion);
        this.search();
    }

    searchWithinDocument() {
        if (this.documentSearchTerm) {
            const documentElement = document.querySelector(".document-content div");
            let innerHTML = "";
            if (this.documentOriginalContent) {
                innerHTML = this.documentOriginalContent;
            } else {
                innerHTML = documentElement.innerHTML;
                this.documentOriginalContent = innerHTML;
            }
            let index = innerHTML.indexOf(this.documentSearchTerm);
            if (index >= 0) {
                let regex = new RegExp(this.documentSearchTerm, "g");
                innerHTML = innerHTML.replace(regex,`<span class="highlight">${this.documentSearchTerm}</span>`);
                documentElement.innerHTML = innerHTML;
                this.documentTextHighlighted = true;

                setTimeout(() => {
                    const firstMatchElement = document.querySelector('.document-content span.highlight')
                    firstMatchElement.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
                }, 500);
            } else {
                documentElement.innerHTML = innerHTML;
            }
        }
    }

    clearSearchWithinDocument() {
        this.documentSearchTerm = "";
        this.documentTextHighlighted = false;
        document.querySelector(".document-content div").innerHTML = this.documentOriginalContent;
    }

}
