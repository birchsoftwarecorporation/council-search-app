import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../helpers/auth-guard.service';

import { AlertListComponent } from './alert-list/alert-list.component';
import { AlertCreateComponent } from './alert-create/alert-create.component';

const routes: Routes = [
  { path: 'list', component: AlertListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: AlertCreateComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertRoutingModule { }
