import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventShowComponent } from './event-show/event-show.component';


@NgModule({
  declarations: [EventListComponent, EventShowComponent],
  imports: [
    CommonModule,
    EventRoutingModule
  ]
})
export class EventModule { }

