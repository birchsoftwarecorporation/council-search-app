import { Preview } from './preview.model';
import { Comment } from './comment.model';
import { Person } from '../../person/person.model';

export class Event {
  // Event
  public id: number;
  public uuid: string;
  public dateCreated: Date;
  public owner: Person;
  public dueDate: Date;
  public status: string;
  public description: string;
  public commentCount: number;

  // Match
  // public previews: new Map<string, string>();
  public matchCount: number;
  public previews = new Array<Preview>();

  // Comments
  public comments = new Array<Comment>();

  // Document
  public documentUUID: string;
  public documentTitle: string;
  public documentType: string;
  public meetingDate: Date;

  // Alert Name
  public alertName: string;

  // Geo
  public regionName: string;
  public stateAbbr: string;

  constructor() { }

  build(jsonObj) {
    this.id = jsonObj.eventId;
    this.uuid = jsonObj.uuid;
    this.status = jsonObj.status;
    this.description = jsonObj.description;
    this.meetingDate = new Date(jsonObj.meetingDate);
    this.documentUUID = jsonObj.documentUUID;
    this.documentTitle = jsonObj.documentTitle;
    this.documentType = jsonObj.documentType;
    this.alertName = jsonObj.alertName;
    this.matchCount = jsonObj.matchCount;
    this.commentCount = jsonObj.commentCount;
    this.regionName = jsonObj.regionName;
    this.stateAbbr = jsonObj.stateAbbr;

    // Add Owner
    this.owner = new Person(jsonObj.owner);

    // Create previews
    if(jsonObj.previews != null) {
      for (var key in jsonObj.previews) {
        this.previews.push(new Preview().build(key, jsonObj.previews[key]));
      }
    }

    // Create comments
    if(jsonObj.comments != null){
      for (let commentObj of jsonObj.comments) {
        let comment = new Comment().build(commentObj);

        this.comments.push(comment);
      }
    }

  }

}
