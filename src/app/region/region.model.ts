export class Region {
  public id: number;
  public name: string;
  public abbr: string;
  public checked: boolean;

  constructor(regionObj) {
    this.id = regionObj.id;
    this.name = regionObj.name;
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
