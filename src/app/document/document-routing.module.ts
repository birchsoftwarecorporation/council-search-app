import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentShowComponent } from './document-show/document-show.component';

const routes: Routes = [
  { path: 'document/:uuid', component: DocumentShowComponent },
  { path: ':docType/:state/:geo/:type/:year/:month/:day', component: DocumentShowComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
