import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs/operators';
import {Meta, Title} from '@angular/platform-browser';

import { SearchService } from '../search.service';

import { Suggestion } from '../models/suggestion';
import { Request } from '../models/request';
import { Result } from '../models/result';
import { Filter } from '../models/filter';


@Component({
  selector: 'app-search',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // Regular
  q = new FormControl();
  startDate = new FormControl();
  endDate = new FormControl();
  rows = 10;
  offset: number;
  total: number;
  exactMatch = false;

  // Facets
  documentType = new Array<Filter>();
  regionType = new Array<Filter>();
  region = new Array<Filter>();
  results = new Array<Result>();

  // Sorting
  sortVal: string;

  // Request
  csRequest: Request;

  // Search Suggestions
  suggestions = new Array<Suggestion>();

  // Display Stuff
  pages = new Array();
  totalPages: number;
  currentPage: number;
  regionFilterText = "";
  displayFilters = false;
  refineIcon = "fa-chevron-down";
  isSuggestLoading = false;
  isPageLoading = true; // TODO - make this a component
  sorts = ["Upcoming", "Most Relevant"];
  errorMsg: string;

  constructor(private actRoute: ActivatedRoute, private searchService: SearchService, private titleService: Title, private metaTagService: Meta) { }

  ngOnInit() {
    this.titleService.setTitle("Search and Refine Documents");
    this.metaTagService.updateTag(
      { name: 'description', content: 'Search and Refine the most recent City Council meeting Agendas and Minutes' }
    );

    // Get the search query
    this.actRoute.queryParamMap.subscribe(params => {
      if(params.get("q") == null){
        this.q?.setValue("");
      }else{
        this.q?.setValue(params.get("q"));
      }

      this.sortVal = "Upcoming"; // Default

      // Call the initial search
      this.search(true);
    });

    this.q?.valueChanges.pipe(
      debounceTime(500), // Wait for the person to type
      tap(() => { // Reset errors
        this.errorMsg = "";
        this.suggestions = [];
      }),
      filter(value => value.length > 2), // Min 3 chars for suggestions
      tap(() => { // set the loading now that we are going to do work
        this.isSuggestLoading = true;
      }),
      switchMap(value => this.searchService.getSuggestions(value, 10).pipe(
        finalize(() => {
          this.isSuggestLoading = false
        })
        )
      ) // Grab the new data
    )
      .subscribe(data => { // Subscribe to it or some bullshit jargon
        // TODO - Add server error checking
        if (data == undefined) {
          this.errorMsg = "Could not get Suggestions"
          this.suggestions = [];
        } else {
          this.errorMsg = "";
          this.suggestions = data.map(item => {
            return new Suggestion(item.name); // Create new model for list
          });
        }
      });

  }

  search(resetPaging){
    // Throw up the page loading
    this.isPageLoading = true;
    // Clear the suggestions
    this.isSuggestLoading = false;
    this.suggestions = [];

    // Reset page count
    if(resetPaging){
      this.offset = 0;
    }

    // Build the request object
    this.csRequest = new Request();
    this.csRequest.q = this.q?.value;
    this.csRequest.offset = this.offset;
    this.csRequest.rows = this.rows;
    this.csRequest.sort = this.sortVal;
    this.csRequest.exactMatch = this.exactMatch;

    // Add multi facets
    // Doc Type
    for (let tempfilter of this.documentType) {
      if (tempfilter.checked) {
        this.csRequest.documentType.push(tempfilter.name)
      }
    }

    // Region Type
    for (let tempfilter of this.regionType) {
      if (tempfilter.checked) {
        this.csRequest.regionType.push(tempfilter.name)
      }
    }

    // Region
    for (let tempfilter of this.region) {
      if (tempfilter.checked) {
        this.csRequest.region.push(tempfilter.name)
      }
    }

    // Process dates
    let startMoment = this.startDate?.value;

    if(startMoment != null){
      console.log("startDate: "+startMoment.format("YYYY-MM-DD"));
      this.csRequest.startDateStr = startMoment.format("YYYY-MM-DD");
    }

    let endMoment = this.endDate?.value;

    if(endMoment != null){
      console.log("endMoment: "+endMoment.format("YYYY-MM-DD"));
      this.csRequest.endDateStr = endMoment.format("YYYY-MM-DD");
    }

    // Parse the results
    this.searchService.getSearchResults(this.csRequest).subscribe(data => {
      if (data == undefined || data == null) {
        this.errorMsg = data['Error'];
      } else {
        this.parseSearchResponse(data);
      }
      this.isPageLoading = false;
    })

    // Scroll to top
    this.scrollToTop();
    // Close the filters
    this.displayFilters = false;
  }

  suggestClick(suggestion){
    // console.log("suggestion: "+suggestion);
    this.q.setValue(suggestion);
    this.search(true);
  }

  toggleDisplay() {
    // Toggle icon
    if(this.refineIcon == "fa-chevron-down"){
      this.refineIcon = "fa-chevron-up";
    }else{
      this.refineIcon = "fa-chevron-down";
    }

    this.displayFilters = !this.displayFilters;
  }

  parseSearchResponse(data) {
    this.total = data.total;
    this.buildResults(data.results);
    this.buildFilters(data);
    this.buildPaging();
  }

  buildResults(results){
    this.results = new Array<Result>(); // Clear the results

    for (let jsonObj of results) {
      // console.log("processing: "+jsonObj);
      this.results.push(new Result(jsonObj));
    }
  }

  buildFilters(data){
    this.documentType = new Array<Filter>();
    this.regionType = new Array<Filter>();
    this.region = new Array<Filter>();

    for (let jsonObj of data.documentType) {
      let filter = new Filter();
      filter.name = jsonObj.name;
      filter.count = jsonObj.count;

      if(this.csRequest.documentType.indexOf(filter.name) > -1){
        filter.checked = true;
      }else{
        filter.checked = false;
      }

      this.documentType.push(filter);
    }

    for (let jsonObj of data.regionType) {
      let filter = new Filter();
      filter.name = jsonObj.name;
      filter.count = jsonObj.count;

      if(this.csRequest.regionType.indexOf(filter.name) > -1){
        filter.checked = true;
      }else{
        filter.checked = false;
      }

      this.regionType.push(filter);
    }

    for (let jsonObj of data.region) {
      let filter = new Filter();
      filter.name = jsonObj.name;
      filter.count = jsonObj.count;
      if(this.csRequest.region.indexOf(filter.name) > -1){
        filter.checked = true;
      }else{
        filter.checked = false;
      }

      this.region.push(filter);
    }
  }

  buildPaging(){
    this.currentPage = (this.offset / this.rows) + 1;
    this.totalPages = Math.ceil(this.total / this.rows);

    // Set the start page and end page
    let startPage: number, endPage: number;

    if (this.totalPages <= 5) {
      // less than 5 total pages so show all
      startPage = 1;
      endPage = this.totalPages;
    } else {
      // more than 5 total pages so calculate start and end pages
      if (this.currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (this.currentPage + 1 >= this.totalPages) {
        startPage = this.totalPages - 2;
        endPage = this.totalPages;
      } else {
        startPage = this.currentPage - 2;
        endPage = this.currentPage + 2;
      }
    }

    // Now build the array of pages
    this.pages = new Array();

    for (var pageNum = startPage; pageNum <= endPage; pageNum++) {
      this.pages.push(pageNum)
    }
  }

  onChangeRegionFilterText(newFilter: string) {
    this.regionFilterText = newFilter;
  }

  clearSelections(){
    this.regionFilterText = "";
    this.sortVal = "Upcoming"; // Default

    // Doc Type
    for (let tempfilter of this.documentType) {
      tempfilter.checked = false;
    }

    // Region Type
    for (let tempfilter of this.regionType) {
      tempfilter.checked = false;
    }

    // Region
    for (let tempfilter of this.region) {
      tempfilter.checked = false;
    }

    // Dates
    this.startDate.setValue(null);
    this.endDate.setValue(null);
  }

  setPage(page: number){
    // console.log("Page: "+page);
    this.offset = (page - 1) * this.rows;
    this.search(false);
  }

  scrollToTop(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  toggleExact(){
    if(this.exactMatch){
      this.exactMatch = false;
    }else{
      this.exactMatch = true;
    }
  }

}
