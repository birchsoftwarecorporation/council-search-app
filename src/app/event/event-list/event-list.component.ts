import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from '../models/event.model';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventListComponent implements OnInit {

  events = new Array<Event>();

  // Display Stuff
  isPageLoading = true; // TODO - make this a component
  errorMsg: string;
  success: boolean;

  constructor(private actRoute: ActivatedRoute,  private eventService: EventService) { }

  ngOnInit(): void {
    // Parse the results
    this.eventService.list().subscribe(data => {
      if (data == undefined || data == null) {
        this.errorMsg = data['Error'];
        this.success = false;
      } else {
        this.buildEvents(data);
        this.success = true;
      }
      this.isPageLoading = false;
    },(error) => {
      console.log(error);
      this.errorMsg = "Could not load event list";
      this.isPageLoading = false;
      this.success = false;
    });
  }

  buildEvents(events){
    this.events = new Array<Event>();

    for (let jsonObj of events) {
      let event = new Event();
      event.build(jsonObj);
      this.events.push(event);
    }
  }

}
