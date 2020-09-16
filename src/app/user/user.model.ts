export class User {
  public id: number;
  public email: string;
  public firstName: string;
  public lastName: string;
  public fullName: string;
  public checked: boolean;

  constructor(jsonObj) {
    this.id = jsonObj.id;
    this.email = jsonObj.email;
    this.firstName = jsonObj.firstName;
    this.lastName = jsonObj.lastName;
    this.fullName = this.lastName+", "+this.firstName;
  }

  toggle(){
    if(this.checked){
      this.checked = false;
    }else{
      this.checked = true;
    }
  }


}

