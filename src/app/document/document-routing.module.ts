import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentComponent } from './document/document.component';

const routes: Routes = [
  { path: 'document/:uuid', component: DocumentComponent },
  { path: ':docType/:state/:geo/:type/:year/:month/:day', component: DocumentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
