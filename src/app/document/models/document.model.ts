export class Document {
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
      if(jsonObj.title.length > 40){
        this.title = jsonObj.title.substring(0, 40) +"...";
      }else{
        this.title  = jsonObj.title;
      }
    }else{
      this.title = "No Title";
    }
  }

  getSnippet(numChars){
    let snippet = "";

    if(this.content != null && this.content != ""){
      if(this.content.length > numChars){
        snippet = this.content.substring(0, numChars);
      }else{
        snippet = this.content;
      }
    }

    return snippet
  }



}
