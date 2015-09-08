class Parameter {
  constructor(offset, name, id, subId, lookup, category) {
    this.offset = offset;
    this.name = name;
    this.id = id;
    this.lookup = lookup || null;
    this.subId = subId;
    this.isGroup = false;
    this.category = category || "";

    if (typeof lookup === "string") {
      this.lookup = lookup.split(",");
//      console.log(typeof this.lookup, this.lookup[2]);
    }
  }

  getValueAsText(programData) {
    let value = programData[this.offset];
    let lookup = this.lookup;

    if (typeof lookup === "object") {
      // use last value if array and out of bounds
      if (lookup instanceof Array && value > lookup.length - 1) {
        value = lookup.length - 1
      }

      return lookup[value];
    }

    if (typeof lookup === "function") {
      return lookup(value, programData);
    }

    return value;
  }
}

let lookupName = (value, data) => {
  var name = "";
  for (let i = 0; i < 12; i++) {
    if (data[i] !== 0)
      name = name + String.fromCharCode(data[i]);
  }
  return name;
};

let lookupSplitKey = (value, data) => {

  let keys = "C,C#,D,D#,E,F,F#,G,G#,A,A#,B".split(",");

  let getKey = (value) => {
    let k = value % 12;
    let o = Math.floor(value / 12) + 1;
    return keys[k] + "-" + o;
  }

  return getKey(value);
};



let programParameters = [
  new Parameter(  0, "Program Name",      0x00, 0x00, lookupName),
  new Parameter( 12, "Category",          0x00, 0x0C, "Synth,Lead,Bass,Brass,Strings,Piano,Key,SE/Voc,User"),
  new Parameter( 13, "Voice Mode",        0x00, 0x0D, "Single,Layer,Split"),
  new Parameter( 14, "TimbreB MIDI Ch.",  0x00, 0x0E, "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,Global"),
  new Parameter( 15, "Split Key",         0x00, 0x0F, lookupSplitKey),
];

export default programParameters;
