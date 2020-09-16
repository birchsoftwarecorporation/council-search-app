import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from '../event.model';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventListComponent implements OnInit {

  events = new Array<Event>();

  // Display Stuff
  isPageLoading = false; // TODO - make this a component
  errorMsg: string;

  constructor(private actRoute: ActivatedRoute,  private eventService: EventService) { }

  ngOnInit(): void {
    // Parse the results
    this.eventService.getEvents().subscribe(data => {
      if (data == undefined || data == null) {
        this.errorMsg = data['Error'];
      } else {
        this.buildEvents(data);
      }
      // this.isPageLoading = false;
    })
  }

  buildEvents(events){
    this.events = new Array<Event>();

    for (let jsonObj of events) {
      this.events.push(new Event(jsonObj));
    }
  }

}
