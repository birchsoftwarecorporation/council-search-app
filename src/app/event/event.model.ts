export class Event {
  // Event
  public id: number;
  public ownerName: string;
  public dateCreated: Date;
  public dueDate: Date;
  public status: string;
  public description: string;
  public commentCount: number;

  // Match
  // public previews: new Map<string, string>();
  public preview: string;
  public matchCount: number;

  // Document
  public documentId: string;
  public documentTitle: string;
  public documentType: string;
  public meetingDate: Date;

  // Alert Name
  public alertName: string;

  // Geo
  public regionName: string;
  public stateAbbr: string;

  constructor(jsonObj) {
    this.id = jsonObj.eventId;
    this.ownerName = jsonObj.owner;
    this.status = jsonObj.status;
    this.description = jsonObj.description;
    this.meetingDate = new Date(jsonObj.meetingDate);
    this.documentId = jsonObj.documentId;
    this.documentTitle = jsonObj.documentTitle;
    this.documentType = jsonObj.documentType;
    this.alertName = jsonObj.alertName;
    this.matchCount = jsonObj.matchCount;
    this.commentCount = jsonObj.commentCount;
    this.regionName = jsonObj.regionName;
    this.stateAbbr = jsonObj.stateAbbr;

    // Grab the first preview
    if(jsonObj.previews != null && jsonObj.previews.length > 0){
      this.preview = jsonObj.previews[0]?.text;
    }else{
      this.preview = "Preview not available"
    }

  }


}
