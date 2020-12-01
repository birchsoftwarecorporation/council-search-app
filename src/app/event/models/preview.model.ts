export class Preview {

  public phrase: string;
  public texts = new Array<string>();

  constructor() {}

  build(key, textList){
    this.phrase = key;

    for(let text of textList){
      this.texts.push(text);
    }

    return this;
  }

}
