import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertRoutingModule } from './alert-routing.module';
import { AlertListComponent } from './alert-list/alert-list.component';
import { AlertCreateComponent } from './alert-create/alert-create.component';
import { AlertShowComponent } from './alert-show/alert-show.component';

@NgModule({
  declarations: [
    AlertListComponent,
    AlertCreateComponent,
    AlertShowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AlertRoutingModule
  ]
})

export class AlertModule { }
