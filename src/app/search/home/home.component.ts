import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize, filter } from 'rxjs/operators';

import { SearchService } from '../../search/search.service';
import { Suggestion } from '../../search/models/suggestion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  q = new FormControl();
  suggestions = new Array<Suggestion>();
  isLoading = false;
  errorMsg: string;

  constructor( private router: Router, private searchService: SearchService ) { }

  ngOnInit() {
    this.q.valueChanges.pipe(
      debounceTime(500), // Wait for the person to type
      tap(() => { // Reset errors
        this.errorMsg = "";
        this.suggestions = [];
      }),
      filter(value => value.length > 2), // Min 3 chars for suggestions
      tap(() => { // set the loading now that we are going to do work
        this.isLoading = true;
      }),
      switchMap(value => this.searchService.getSuggestions(value, 10)
        .pipe(
          finalize(() => {
            this.isLoading = false
          })
        )
      ) // Grab the new data
    )
      .subscribe(data => { // Subscribe to it or some bullshit jargon
        if (data == undefined) {
          this.errorMsg = data['Error'];
          this.suggestions = [];
        } else {
          this.errorMsg = "";
          this.suggestions = data.map(item => {
            return new Suggestion(item.name); // Create new model for list
          });
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
