class Parameter {
  constructor(offset, name, midiId, midiSubId, lookup = null, category = "", id, length = 1, bit) {
    this.offset = offset;
    this.name = name;
    this.midiId = midiId;
    this.lookup = lookup;
    this.midiSubId = midiSubId;
    this.category = category;
    this.id = id;
    this.parent = null;
    this.length = length;
    this.isGroup = false;
    this.bit = bit;
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

  getByte(programData, offset) {

    // Do we have Immutable data?

    if (!programData) debugger;

    let useGet = typeof programData.get === "function";
    let value;

    if (useGet) {
      value = programData.get(offset);
    } else {
      value = programData[offset];
    }

    return value;
  }

  getValue(programData) {

    let offset = this.getOffset();
    if (offset > programData.length) {
      return undefined;
    }

    // TODO: handle 2 byte values
    if (this.length > 1) {
      let values = [];

      for (let i = 0; i < this.length; i++) {
        let value = this.getByte(programData, offset + i);
        values.push(value);
      }

      // TODO: have a parameter type to convert to byte, word or string? and maybe boolean as well? 0,1:Off,On
      if (this.length === 2) {
        let [lsb, msb] = values;
        let value = (msb << 8) + lsb;

        if (isNaN(value)) debugger;

        return value;
      } else {
        return values;
      }
    } else {

      let value = this.getByte(programData, offset);

      if (this.bit !== undefined) {
        // shift bit
        value = (value >> this.bit) & 0b1;
      }

      if (value > 127)  {
        // convert to negative
        value = -(~(value - 1) & 0xff);
      }

      return value;
    }
  }

  getValueAsText(programData) {
    let offset = this.getOffset();

    // TODO: handle 2 byte values

    let value = this.getValue(programData);
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
      } else if (lookup.mappings instanceof Array) {
        //text = lookup[value];

        let mapping = lookup.mappings.filter((item) => item.value === value);

        if (mapping.length === 0) {
          console.warn("Parameter value lookup value missing", this, value);
        } else {
           text = mapping[0].text;
        }
      } else {
        // no mapping just calculate value string
        text = `${value}${lookup.type}`;
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

  getToggleValue(programData) {

    if (this.bit !== undefined) {

      let currentCompoundValue = this.getByte(programData, this.getOffset());
      let toggleBit = 1 << this.bit;

      return currentCompoundValue ^ toggleBit;
    } else {
      return this.getValue(programData);
    }
  }

  getProps(data) {

    let text = this.getValueAsText(data);
    let value = this.getValue(data);

    // TODO: handle lookup that depends on actual data value
    // TODO: offset is static should not be computed every time
    return {
      id: this.id,
      name: this.name,
      offset: this.getOffset(),
      category: this.category,
      min: this.lookup.min,
      max: this.lookup.max,
      lookup: this.lookup,
      value: value,
      text: text,
    }

  }
}

export default Parameter;
