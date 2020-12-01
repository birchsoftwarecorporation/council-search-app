export class Comment {

  public firstName: string;
  public lastName: string;
  public text: string;
  public dateCreated: Date;

  constructor() {}

  build(jsonObj) {
    this.firstName = jsonObj.firstName;
    this.lastName = jsonObj.lastName;
    this.text = jsonObj.text;
    this.dateCreated = new Date(jsonObj.dateCreated);

    return this;
  }

}
