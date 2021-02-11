import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-electric-utility',
  templateUrl: './electric-utility.component.html',
  styleUrls: ['./electric-utility.component.css']
})

export class ElectricUtilityComponent implements OnInit {
  
  private relatedDocuments: Document[] = []

  constructor() { }

  ngOnInit(): void {
    this.relatedDocuments.push({id: "1", name: "Et harum quidem rerum facilis est", date: "February 12, 2021", downloadURL: ""});
    this.relatedDocuments.push({id: "2", name: "Pleasure is to be welcomed and every pain avoided", date: "February 12, 2021", downloadURL: ""});
    this.relatedDocuments.push({id: "3", name: "The standard chunk of Lorem Ipsum", date: "February 12, 2021", downloadURL: ""});
    this.relatedDocuments.push({id: "4", name: "Latin words, combined with a handful of model", date: "February 12, 2021", downloadURL: ""});
    this.relatedDocuments.push({id: "5", name: "Temporibus autem quibusdam et", date: "February 12, 2021", downloadURL: ""})
  }

}

interface Document {
  id: string,
  name: string,
  date: string,
  downloadURL: string
}


