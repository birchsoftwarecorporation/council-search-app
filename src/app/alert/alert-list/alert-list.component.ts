import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';

import { Alert } from '../models/alert.model';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.css']
})
export class AlertListComponent implements OnInit {

  alerts = new Array<Alert>();

  // Display Stuff
  isPageLoading = true; // TODO - make this a component
  errorMsg: string;
  success: boolean;

  constructor(private actRoute: ActivatedRoute, private alertService: AlertService, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit() {
    // Parse the results
    this.alertService.list().subscribe(data => {
      if (data == undefined || data == null) {
        console.log(data['Error']);
        this.errorMsg = "Could not load alert list";
        this.success = false;
      } else {
        for (let alertObj of data) {
          let alert = new Alert();
          alert.buildListItem(alertObj);
          this.alerts.push(alert);
        }
        this.success = true;
      }
      this.isPageLoading = false;
    },(error) => {
      console.log(error);
      this.errorMsg = "Could not load alert list";
      this.isPageLoading = false;
      this.success = false;
    });

  }

  removeAlert(alert){
    this.toastr.info("Preparing to delete alert '"+alert.name+"'...", "Alert", { timeOut: 5000 });

    this.alertService.delete(alert.id).subscribe(data => {
      if (data == undefined || data == null) {
        this.errorMsg = data['Error'];
      } else {
        let index = this.alerts.indexOf(alert);
        console.log("Found index: "+index);

        if (index !== -1) {
          this.alerts.splice(index, 1);
        }

        this.toastr.success("Successfully removed alert '"+alert.name+"'", "Alert", { timeOut: 5000 });
      }
    },(error) => {
      this.toastr.error("Could not remove alert '"+alert.name+"'", "Alert", { timeOut: 5000 });

    });
  }

}


