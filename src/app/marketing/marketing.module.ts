import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketingRoutingModule } from './marketing-routing.module';
import { ElectricUtilityComponent } from './electric-utility/electric-utility.component';


@NgModule({
  declarations: [ElectricUtilityComponent],
  imports: [
    CommonModule,
    MarketingRoutingModule
  ]
})
export class MarketingModule { }
