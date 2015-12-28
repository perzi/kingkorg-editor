
class Parameter {
  constructor(config) {
    this.number = config.number;
    this.name = config.name;
    this.title = config.title;
    this.lookup = config.lookup;
    this.id = config.id;
    this.subId = config.subId;
    this.midiId = config.midiId;
    this.min = 0;
    this.max = 0;
    this.isGroup = false;

  }

  getValueAsText(programData) {
    let value = programData[this.number];

    if (typeof this.lookup === "object") {
      return this.lookup[value];
    }
    if (typeof this.lookup === "function") {
      return this.lookup(value, programData);
    }
    return value;
  }

  // parseString(config) {
  //   let reg = /^\s*|?\s*(\d)+\s*|\s*([^|])+/;
  //
  //
  //
  // }

}

export default Parameter;
