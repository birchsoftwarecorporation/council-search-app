import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElectricUtilityComponent } from './electric-utility/electric-utility.component';


const routes: Routes = [
  { path: 'electric-utility', component: ElectricUtilityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }
