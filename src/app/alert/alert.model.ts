import {User} from '../model/user.model';
import {Result} from '../model/search/result';

export class Alert {
  public id: number;
  public name: string;
  public status: string;
  public isManager: boolean;
  public dateCreated: Date;
  public lastUpdated: Date;
  public manager: string;
  public numMembers: number;
  public numRegions: number;
  public numPhrases: number;


  constructor(jsonObj) {
    this.id = jsonObj.id;
    this.name = jsonObj.name;
    this.status = jsonObj.status;
    this.manager = jsonObj.manager;
    this.isManager = jsonObj.isManager;
    this.numMembers = jsonObj.numMembers;
    this.numRegions = jsonObj.numRegions;
    this.numPhrases = jsonObj.numPhrases;
    this.dateCreated = new Date(jsonObj.dateCreated);
    this.lastUpdated = new Date(jsonObj.lastUpdated);
  }

}
