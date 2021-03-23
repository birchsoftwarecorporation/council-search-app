import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Contact } from '../../contact/models/contact.model'

@Component({
  selector: 'app-download-dialog',
  templateUrl: './download-dialog.component.html',
  styleUrls: ['./download-dialog.component.css'],
})
export class DownloadDialogComponent implements OnInit {

  contact: Contact;
  errorMsg: string;

  constructor(
    public dialogRef: MatDialogRef<DownloadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.contact = new Contact();
    this.contact.type = "download";
  }

  public onDownloadFormSubmit(): void {
    if(this.contact.name == null || this.contact.name == ""){
      this.errorMsg = "Please enter a valid Name"
    } else if(this.contact.company == null || this.contact.company == ""){
      this.errorMsg = "Please enter a valid Company"
    } else if(this.contact.email == null || this.contact.email == "" || !this.validateEmail(this.contact.email)){
      this.errorMsg = "Please enter a valid Email"
    }else{ // Valid send the data and let them download
      this.dialogRef.close({ action: "ok", contact: this.contact });
    }
  }

  public cancelDownload(): void {
    this.dialogRef.close({ action: "cancel" });
  }

  public validateEmail(email){
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
      return true;
    }
    return false;
  }
}
