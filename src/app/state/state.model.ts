export class State {
  public id: number;
  public name: string;
  public abbr: string;
  public checked: boolean;

  constructor(stateObj) {
    this.id = stateObj.id;
    this.name = stateObj.name;
    this.abbr = stateObj.abbr;
    this.checked = false; // default off
  }

  toggle(){
    if(this.checked){
      this.checked = false;
    }else{
      this.checked = true;
    }
  }

}
