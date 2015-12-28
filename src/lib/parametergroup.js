
class ParameterGroup {
  constructor(config) {
    this.number = config.number;
    this.name = config.name;
    this.title = config.title;
    this.id = config.id;
    this.subId = config.subId;
    this.midiId = config.midiId;
    this.parameters = config.parameters;
    this.isGroup = true;

    // update child parameters values to add the parent's offset
    this.parameters.forEach(parameter => {
      parameter.number += this.number;
    });
  }

  getValueAsText(programData) {
    let value = programData[this.number];

    if (typeof this.lookup === "object") {
      return this.lookup[value];
    }

  }
}

export default ParameterGroup;
