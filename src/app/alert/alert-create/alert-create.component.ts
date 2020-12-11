import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { AlertService } from '../alert.service';
import { StateService } from '../../state/state.service';
import { RegionService } from '../../region/region.service';
import { PersonService } from '../../person/person.service';

import { Region } from '../../region/region.model';
import { Alert } from '../models/alert.model';
import { State } from '../../state/state.model';
import { Person } from '../../person/person.model';


@Component({
  selector: 'app-alert-create',
  templateUrl: './alert-create.component.html',
  styleUrls: ['./alert-create.component.css']
})
export class AlertCreateComponent implements OnInit {
  // Page Controls
  isPageLoading: boolean; // TODO - make this a component
  errorMsg: string;
  success: boolean;

  nameError = "";
  phraseError = "";
  stateFilterText = "";

  // Step controls
  detailsComplete = false;
  stateComplete = false;
  regionsComplete = false;
  collabComplete = false;
  alertComplete = false;

  // Data
  alert = new Alert();
  stateMap = new Map();
  regionMaps = new Array();
  collabMap = new Map();
  tempPhrase = "";

  constructor(private router:Router, private alertService: AlertService, private stateService: StateService, private regionService: RegionService, private personService: PersonService, private toastr: ToastrService) { }

  ngOnInit() {
    this.isPageLoading = true; // TODO - make this a component

    // Parse the state results
    this.stateService.list().subscribe(data => {
      if (data == undefined || data == null) {
        this.errorMsg = data['Error'];
        this.success = false;
      } else {
        this.buildStates(data);
        // Guess we will just put this here?
        this.errorMsg = null;
        this.isPageLoading = false;
        this.success = true;
      }
    },(error) => {
      console.log(error);
      this.errorMsg = "Could not load States";
      this.isPageLoading = false;
      this.success = false;
    });

    this.personService.list().subscribe(data => {
      if (data == undefined || data == null) {
        this.errorMsg = data['Error'];
        this.success = false;
      } else {
        this.buildCollab(data);
        // Guess we will just put this here?
        this.errorMsg = null;
        this.success = true;
      }
      this.isPageLoading = false;
    },(error) => {
      console.log(error);
      this.errorMsg = "Could not load collaborators";
      this.isPageLoading = false;
      this.success = false;
    });
  }

  validateDetails(){
    this.detailsComplete = true;
  }

  validateState(){
    this.stateComplete = true;
    this.buildRegions();
  }

  validateRegions(){
    this.alert.regions = new Array<number>();

    // Populate the completed regions
    for (let regionMap of this.regionMaps) {
      for(let region of regionMap.get("regions")){
        if(region.checked){
          this.alert.regions.push(region.id);
        }
      }
    }

    this.regionsComplete = true;
  }

  validateCollabs(){
    this.alert.members = new Array<number>();

    // Populate the completed members
    for(let member of this.collabMap.get("people")){
      if(member.checked){
        this.alert.members.push(member.id);
      }
    }

    this.collabComplete = true;
  }

  addPhrase(){
    if(this.tempPhrase != ""){
      let phraseList = this.tempPhrase.split(',');

      for(let phrase of phraseList){
        // console.log("Adding phrase: "+phrase.trim());
        this.alert.phrases.push(phrase.trim());
      }
    }
    this.tempPhrase = "";
  }

  removePhrase(phrase){
    if(phrase != ""){
      const index = this.alert.phrases.indexOf(phrase)
      if (index > -1) { this.alert.phrases.splice(index, 1) }
    }
  }

  buildStates(statesJSON){
    let states = new Array<State>();

    // Create the state obj
    for (let stateJSON of statesJSON) {
      states.push(new State(stateJSON));
    }

    // Add the filter to the map
    this.stateMap.set("filter", "");

    // Add the states to the map
    this.stateMap.set("states", states);
  }

  // Request the regions for the selected states
  buildRegions(){
    // Clear the maps in case they hit back
    this.regionMaps = new Array();
    // Lets grab all of the select states and request their regions
    for (let state of this.stateMap.get("states")) {
      if(state.abbr != undefined && state.abbr != "" && state.checked){
        // console.log("Processing state: "+state.name);
        let regionMap = new Map();
        // regionMap.set("isLoading", true);

        this.regionService.getRegions(state.abbr).subscribe(data => {
            let regions = new Array();
            // Walk through the regions we get back
            for (let regionJSON of data) {
              regions.push(new Region(regionJSON));
            }

            // Add the regions list to the map
            regionMap.set("regions", regions);
            regionMap.set("stateName", state.name);
            regionMap.set("filter", "");
        })

        // Add the Region map to the list of region maps
        this.regionMaps.push(regionMap);
      }
    }
  }

  buildCollab(peopleJSON){
    let people = new Array<Person>();

    // Create the state obj
    for (let personJSON of peopleJSON) {
      people.push(new Person(personJSON));
    }

    // Add the filter to the map
    this.collabMap.set("filter", "");

    // Add the collaborators to the map
    this.collabMap.set("people", people);

  }

  createAlert(){
    this.toastr.info("Preparing alert...", "Alert", { timeOut: 5000 });

    // Parse the results
    this.alertService.create(this.alert).subscribe(alert => {
      if (alert == undefined || alert == null) {
        this.toastr.error("Could not create alert!", "Alert", { timeOut: 5000 });
      } else {
        this.toastr.info("Looking for recent events...", "Alert", { timeOut: 5000 });


        // Tell the server to process the new alert
        this.alertService.process(alert.id).subscribe(data => {
          if (data == undefined || data == null) {
            this.toastr.error("Could not process alert!", "Alert", { timeOut: 5000 });
          } else {
            this.toastr.success("Alert '"+this.alert.name+"' created successfully!", "Alert", { timeOut: 5000 });

            setTimeout(() => {
              this.router.navigate(['/alert/list']);
            }, 1000);
          }
        })
      }
    })
  }

}
