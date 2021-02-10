import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketingRoutingModule } from './marketing-routing.module';
import { UtilityComponent } from './utility/utility.component';
import { ElectricUtilityComponent } from './electric-utility/electric-utility.component';


@NgModule({
  declarations: [UtilityComponent, ElectricUtilityComponent],
  imports: [
    CommonModule,
    MarketingRoutingModule
  ]
})
export class MarketingModule { }
