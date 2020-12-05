export class Document {
  // TODO - Migrate to model
  public uuid: string;

  public stateAbbr: string;
  public regionName: string;
  public monitorURL: string;
  public dateCreated: Date;
  public meetingDate: Date;
  public lastModified: Date;
  public title: string;
  public url: string;
  public content: string;
  public documentType: string;

  constructor() { }

  build(jsonObj) {
    this.uuid = jsonObj.uuid;
    this.stateAbbr = jsonObj.stateAbbr;
    this.regionName = jsonObj.regionName;
    this.monitorURL = jsonObj.monitorURL;
    this.dateCreated = new Date(jsonObj.dateCreated);
    this.meetingDate = new Date(jsonObj.meetingDate);
    this.lastModified = new Date(jsonObj.lastModified);
    this.url = jsonObj.url;
    this.content = jsonObj.content;
    this.documentType = jsonObj.documentType;

    if(jsonObj.title != null && jsonObj.title != ""){
      this.title = jsonObj.title;
    }else{
      this.title = "No Title";
    }
  }

}
