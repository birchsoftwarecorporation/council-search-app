import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-download-dialog',
  templateUrl: './download-dialog.component.html',
  styleUrls: ['./download-dialog.component.css'],
})
export class DownloadDialogComponent implements OnInit {
    public downloadFormData = {
        name: "",
        company: "",
        email: ""
    }
    
    constructor(
        public dialogRef: MatDialogRef<DownloadDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit(): void {
    }

    public onDownloadFormSubmit(): void {
        this.dialogRef.close({ action: "ok", userDownloadInfo: this.downloadFormData });
    }

    public cancelDownload(): void {
        this.dialogRef.close({ action: "cancel" });
    }
}
