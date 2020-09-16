import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertListComponent } from './alert-list/alert-list.component';
import { AlertCreateComponent } from './alert-create/alert-create.component';

const routes: Routes = [
  { path: 'alert/list', component: AlertListComponent },
  { path: 'alert/create', component: AlertCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertRoutingModule { }
