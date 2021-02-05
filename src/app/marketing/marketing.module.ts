import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketingRoutingModule } from './marketing-routing.module';
import { UtilityComponent } from './utility/utility.component';


@NgModule({
  declarations: [UtilityComponent],
  imports: [
    CommonModule,
    MarketingRoutingModule
  ]
})
export class MarketingModule { }
