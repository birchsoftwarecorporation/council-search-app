export class User {
  public id: number;
  public email: string;
  public firstName: string;
  public lastName: string;

  constructor(jsonObj) {
    this.id = jsonObj.id;
    this.email = jsonObj.email;
    this.firstName = jsonObj.firstName;
    this.lastName = jsonObj.lastName;
  }

}

