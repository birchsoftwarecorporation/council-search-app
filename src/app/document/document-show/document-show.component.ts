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

    constructor(
        private router: Router, 
        private actRoute: ActivatedRoute, 
        private searchService: SearchService, 
        private documentService: DocumentService, 
        private toastr: ToastrService, 
        private titleService: Title, 
        private metaTagService: Meta,
        public dialog: MatDialog
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
                console.log("User download info: ", result.userDownloadInfo);
                
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

}
