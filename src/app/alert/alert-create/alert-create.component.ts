import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { AlertService } from '../alert.service';
import { StateService } from '../../state/state.service';
import { RegionService } from '../../region/region.service';
import { UserService } from '../../user/user.service';

import { Region } from '../../region/region.model';
import { Alert } from '../alert.model';
import { State } from '../../state/state.model';
import { User } from '../../user/user.model';


@Component({
  selector: 'app-alert-create',
  templateUrl: './alert-create.component.html',
  styleUrls: ['./alert-create.component.css']
})
export class AlertCreateComponent implements OnInit {
  // Page Controls
  isPageLoading = false; // TODO - make this a component
  nameError = "";
  phraseError = "";
  stateFilterText = "";

  // Step controls
  detailsComplete = false;
  stateComplete = false;
  regionsComplete = false;
  collabComplete = false;
  connectorsComplete = false;

  // Data
  alert = new Alert();
  stateMap = new Map();
  regionMaps = new Array();
  collabMap = new Map();
  tempPhrase = "";

  constructor(private router:Router, private alertService: AlertService, private stateService: StateService, private regionService: RegionService, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    // Parse the state results
    this.stateService.getStates().subscribe(data => {
      if (data == undefined || data == null) {
        // this.errorMsg = data['Error'];
      } else {
        this.buildStates(data);
      }
    })

    this.userService.getUsers().subscribe(data => {
      if (data == undefined || data == null) {
        // this.errorMsg = data['Error'];
      } else {
        this.buildCollab(data);
      }
    })
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
    for(let member of this.collabMap.get("users")){
      if(member.checked){
        this.alert.members.push(member.id);
      }
    }

    this.collabComplete = true;
  }

  addPhrase(){
    if(this.tempPhrase != ""){
      this.alert.phrases.push(this.tempPhrase);
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

  buildCollab(usersJSON){
    let users = new Array<User>();

    // Create the state obj
    for (let userJSON of usersJSON) {
      users.push(new User(userJSON));
    }

    // Add the filter to the map
    this.collabMap.set("filter", "");

    // Add the users to the map
    this.collabMap.set("users", users);

  }

  createAlert(){
    this.toastr.info("Preparing alert...", "Alert", { timeOut: 5000 });

    // Parse the results
    this.alertService.createAlert(this.alert).subscribe(data => {
      if (data == undefined || data == null) {
        this.toastr.error("Could not create alert!", "Alert", { timeOut: 5000 });
      } else {
        this.toastr.success("Alert '"+this.alert.name+"' created successfully!", "Alert", { timeOut: 5000 });
        setTimeout(() => {
          this.router.navigate(['/alert/list']);
        }, 1000);
      }
    })
  }

}
