class ParamGroup {
  constructor(offset, name, midiId, midiSubId, parameters, category, id) {
    this.offset = offset;
    this.name = name;
    this.midiId = midiId;
    this.midiSubId = midiSubId;
    this.parameters = parameters;
    this.category = category || "";
    this.id = id;
    this.parent = null;
    this.isGroup = true;

    this.parameters.forEach(parameter => parameter.setParent(this));
  }

  setParent(parent) {
    this.parent = parent;
  }

  getOffset() {
    if (this.parent) {
      return this.offset + this.parent.getOffset();
    } else {
      return this.offset;
    }
  }

  getParameter(id) {
    let parameters = this.parameters.filter((parameter) => {
      return parameter.id === id;
    });

    return parameters.length > 0 ? parameters[0] : undefined;
  }
}

export default ParamGroup;
