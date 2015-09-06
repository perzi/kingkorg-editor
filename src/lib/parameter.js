
class Parameter {
  constructor(config) {
    //let params = typof params = "string" ? this.parseString(config) : config;

    // TODO: parse some parameter values, like lookup

    this.number = config.number;
    this.name = config.name;
    this.title = config.title;
    this.lookup = config.lookup;
    this.id = config.id;
    this.subId = config.subId;
    this.midiId = config.midiId;
    this.min = 0;
    this.max = 0;
  }

  getValueAsText(programData) {
    // let parameter be responsible for getting value?


    let value = programData[this.number];

    // TODO: call parameter to render text
    if (typeof this.lookup === "object") {
      return this.lookup[value];
    }

  }

  // parseString(config) {
  //   let reg = /^\s*|?\s*(\d)+\s*|\s*([^|])+/;
  //
  //
  //
  // }

}

export default Parameter;
