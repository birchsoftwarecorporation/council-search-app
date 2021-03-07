import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../helpers/auth-guard.service';

import { EventListComponent } from './event-list/event-list.component';
import { EventShowComponent } from './event-show/event-show.component';

const routes: Routes = [
  { path: 'list', component: EventListComponent, canActivate: [AuthGuard] },
  { path: 'show/:uuid', component: EventShowComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
