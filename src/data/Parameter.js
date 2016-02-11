class Parameter {
  constructor(offset, name, midiId, midiSubId, lookup, category, id, length) {
    this.offset = offset;
    this.name = name;
    this.midiId = midiId;
    this.lookup = lookup || null;
    this.midiSubId = midiSubId;
    this.category = category || "";
    this.id = id;
    this.parent = null;
    this.length = length || 1;
    this.isGroup = false;

    // TODO: remove?
    if (typeof lookup === "string") {

      console.error("Lookup as string", name);
      if (/^-?\d+~\d+/.test(lookup)) {

        // just output raw value for now
        this.lookup = null;
      } else {
        // expect it to be comma separated
        this.lookup = lookup.split(",");
      }
    }
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

  getMidiId() {
    if (this.parent) {
      let { midiId, midiSubId } = this.parent.getMidiId()
      return {
        midiId: this.midiId + midiId,
        midiSubId: this.midiSubId + midiSubId
      };
    } else {
      return {
        midiId: this.midiId,
        midiSubId: this.midiSubId
      };
    }
  }

  getByte(programData, index) {

    // Do we have Immutable data?
    let useGet = typeof programData.get === "function";

    if (useGet) {
      return programData.get(this.getOffset());
    } else {
      return programData[this.getOffset()];
    }
  }

  getValue(programData) {
    if (this.length > 1) {
      let values = [];
      for (let i = 0; i < this.length; i++) {
        values.push(this.getByte(programData, i));
      }
      return values;
    } else {
      return this.getByte(programData, this.getOffset());
    }
  }

  getValueAsText(programData) {
    let offset = this.getOffset();
    let value = this.getByte(programData, offset);
    let lookup = this.lookup;
    let text = "";

    if (value === undefined) {
      return "";
    }

    if (lookup && typeof lookup === "object") {
      // use last value if array and out of bounds
      if (lookup instanceof Array && value > lookup.length - 1) {
        value = lookup.length - 1
      }

      if (typeof lookup.values === "object") {
        text = lookup.values[value];
      } else {
        text = lookup[value];
      }
    }

    if (typeof lookup === "function") {
      text = lookup(value, programData);
    }

    if (text === undefined || text === null) {
      console.warn("Parameter value lookup mismatch", this, value);
      text = "";
    }

    return text;
  }

  getAllValues() {
    let lookup = this.lookup;

    if (lookup && typeof lookup === "object") {
      if (typeof lookup.values === "object") {
        return lookup;
      }
    }
  }
}

export default Parameter;
