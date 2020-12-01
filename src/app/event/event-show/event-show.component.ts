import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { EventService } from '../event.service';

import { Event } from '../models/event.model';
import { Comment } from '../models/comment.model';
import { Person } from '../../person/person.model';

@Component({
  selector: 'app-event-show',
  templateUrl: './event-show.component.html',
  styleUrls: ['./event-show.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventShowComponent implements OnInit {

  event: Event;
  members = new Array<Person>();
  newComment: string;

  // Display Stuff
  isPageLoading = true; // TODO - make this a component
  errorMsg: string;
  success: boolean;
  statuses = ["open", "in progress", "complete"];

  constructor(private actRoute: ActivatedRoute, private eventService: EventService, private toastr: ToastrService) {
    // Grab the event id from active route
    this.event = new Event();
    this.event.uuid = this.actRoute.snapshot.params.uuid;
  }

  ngOnInit(): void {
    // Grab this events members
    this.eventService.getMembers(this.event.uuid).subscribe(data => {
      if (data == undefined || data == null) {
        // this.errorMsg = data['Error'];
      } else {
        this.buildMembers(data);
      }
    })

    // Parse the results
    this.eventService.get(this.event.uuid).subscribe(data => {

      if (data == undefined || data == null) {
        this.errorMsg = data['Error'];
        this.success = false;
      } else {
        this.event.build(data);
        this.success = true;
      }
      this.isPageLoading = false;
    },(error) => {
      console.log(error);
      this.errorMsg = "Could not load event";
      this.isPageLoading = false;
      this.success = false;
    });

  }

  applyDescription(){
    this.toastr.info("Updating description...", "Event", { timeOut: 10000 });

    this.eventService.updateDescription(this.event.uuid, this.event.description).subscribe(data => {
      if (data == undefined || data == null) {
        this.toastr.error("Could not update description", "Event", { timeOut: 10000 });
      } else {
        this.toastr.success("Successfully updated description", "Event", { timeOut: 10000 });
      }
    },(error) => {
      console.log(error);
      this.toastr.error("Could not update description", "Event", { timeOut: 10000 });
    });
  }

  applyComment(){
    this.toastr.info("Adding comment...", "Event", { timeOut: 10000 });

    this.eventService.addComment(this.event.uuid, this.newComment).subscribe(data => {
      if (data == undefined || data == null) {
        this.toastr.error("Could not add comment", "Event", { timeOut: 10000 });
      } else {
        // Add the new comment to the display
        let comment = new Comment().build(data);
        this.event.comments.unshift(comment);
        this.newComment = "";
        this.toastr.success("Successfully added comment", "Event", { timeOut: 10000 });
      }
    },(error) => {
      console.log(error);
      this.toastr.error("Could not add comment", "Event", { timeOut: 10000 });
    });
  }

  buildMembers(membersJSON){
    // Create the members avail list
    for (let userJSON of membersJSON) {
      this.members.push(new Person(userJSON));
    }

    // Sort by last name
    this.members.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1)

  }

  onStatusChange(status){
    this.toastr.info("Updating status...", "Event", { timeOut: 10000 });

    this.eventService.updateStatus(this.event.uuid, this.event.status).subscribe(data => {
      if (data == undefined || data == null) {
        this.toastr.error("Could not update status", "Event", { timeOut: 10000 });
      } else {
        this.toastr.success("Successfully updated status", "Event", { timeOut: 10000 });
      }
    },(error) => {
      console.log(error);
      this.toastr.error("Could not update status", "Event", { timeOut: 10000 });
    });
  }

  onOwnerChange(owner){
    this.toastr.info("Updating owner...", "Event", { timeOut: 10000 });

    this.eventService.updateOwner(this.event.uuid, this.event.owner.id).subscribe(data => {
      if (data == undefined || data == null) {
        this.toastr.error("Could not update owner", "Event", { timeOut: 10000 });
      } else {
        this.toastr.success("Successfully updated owner", "Event", { timeOut: 10000 });
      }
    },(error) => {
      console.log(error);
      this.toastr.error("Could not update owner", "Event", { timeOut: 10000 });
    });
  }

  userCompare(option, value) : boolean{
    return option.id === value.id;
  }

}
