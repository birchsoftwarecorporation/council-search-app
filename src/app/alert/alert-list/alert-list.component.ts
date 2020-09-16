import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Alert } from '../alert.model';
import { AlertService } from '../alert.service';


@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.css']
})
export class AlertListComponent implements OnInit {

  alerts = new Array<Alert>();
  errorMsg: string;
  isPageLoading = false; // TODO - make this a component

  constructor(private actRoute: ActivatedRoute, private alertService: AlertService, public dialog: MatDialog) { }

  ngOnInit() {
    // Parse the results
    this.alertService.getAlerts().subscribe(data => {
      if (data == undefined || data == null) {
        this.errorMsg = data['Error'];
      } else {
        for (let alertObj of data) {
          let alert = new Alert();
          alert.buildListItem(alertObj);
          this.alerts.push(alert);
        }
      }
      this.isPageLoading = false;
    })
  }

  // openRemoveDialog() {
  //   // this.dialog.open(DialogElementsExampleDialog);
  // }

}


