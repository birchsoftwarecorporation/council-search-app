import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';


import { EventRoutingModule } from './event-routing.module';

import { EventListComponent } from './event-list/event-list.component';
import { EventShowComponent } from './event-show/event-show.component';


@NgModule({
  declarations: [EventListComponent, EventShowComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule,
    MatSelectModule,
    MatExpansionModule
  ]
})
export class EventModule { }

