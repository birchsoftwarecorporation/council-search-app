export class Alert {
  public id: number;
  public name: string;
  public phrases = new Array<String>();
  public regions = new Array<number>(); // List of ids
  public members = new Array<number>(); // List of ids
  public status: string;
  public isManager: boolean;
  public dateCreated: Date;
  public lastUpdated: Date;
  public manager: string;
  public numMembers: number;
  public numRegions: number;
  public numPhrases: number;
  public imgNum: number;

  constructor() {
    this.name = "";
  }

  buildListItem(jsonObj) {
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
    this.imgNum = jsonObj.image;
  }


  randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
