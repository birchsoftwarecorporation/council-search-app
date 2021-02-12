export class MarketMatch {
  // Market Match
  public id: number;
  public documentTitle: string;
  public meetingDate: Date;
  public city: string;
  public stateAbbr: string;
  public preview: string;

  constructor() { }

  build(jsonObj) {
    this.id = jsonObj.eventId;
    this.documentTitle = jsonObj.documentTitle;
    this.meetingDate = new Date(jsonObj.meetingDate);
    this.city = jsonObj.city;
    this.stateAbbr = jsonObj.stateAbbr;
    this.preview = jsonObj.preview;
  }

}
