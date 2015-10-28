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

    if (typeof lookup === "string") {

      if (/^-?\d+~\d+/.test(lookup)) {

        // just output raw value for now
        this.lookup = null;
        // // range:  x~y or x~y~z
        // if (lookup.indexOf(":") > 0) {
        //   // there's a mapping here here
        //
        //
        // } else {
        //   // just map it
        //   let values = lookup.split("~");
        //
        //   let min = parseInt(values[0]);
        //   let max = parseInt(values[values.length - 1]);
        //
        //   this.lookup = (value, programData) => {
        //     let total = max - min;
        //     return value / 127 * total + min;
        //   };
        // }
        //
        // this.lookup = (value, programData) => {
        //   return value;
        // };
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

  getValue(programData) {
    if (this.length > 1) {
      let values = [];
      // TODO: return array of values instead
      for (let i = 0; i < this.length; i++) {
        values.push(programData.get(this.getOffset()));
      }
      return values;
    } else {
      return programData.get(this.getOffset());
    }
  }

  getValueAsText(programData) {
    let value = programData.get(this.getOffset());
    let lookup = this.lookup;

    if (lookup && typeof lookup === "object") {
      // use last value if array and out of bounds
      if (lookup instanceof Array && value > lookup.length - 1) {
        value = lookup.length - 1
      }

      return lookup[value];
    }

    if (typeof lookup === "function") {
      return lookup(value, programData);
    }

    return new String(value);
  }
}

export default Parameter;
