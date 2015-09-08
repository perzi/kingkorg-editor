class Parameter {
  constructor(offset, name, id, subId, lookup, category) {
    this.offset = offset;
    this.name = name;
    this.id = id;
    this.lookup = lookup || null;
    this.subId = subId;
    this.category = category || "";
    this.parent = null;
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
    this.offset += parent.offset;
    this.id += parent.id;
    this.subId += parent.subId;
  }

  getValue(programData) {
    return programData[this.offset];
  }

  getValueAsText(programData) {
    let value = programData[this.offset];
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

    return value;
  }
}


class ParamGroup {
  constructor(offset, name, id, subId, parameters, category) {
    this.offset = offset;
    this.name = name;
    this.id = id;
    this.subId = subId;
    this.parameters = parameters;
    this.category = category || "";
    this.parent = null;
    this.isGroup = true;

    this.parameters.forEach(parameter => parameter.setParent(this));
  }

  setParent(parent) {
    this.parent = parent;
    this.offset += parent.offset;
    this.id += parent.id;
    this.subId += parent.subId;
    this.parameters.forEach(parameter => parameter.setParent(this));
  }
}


let createLookup = (raw) => {
  let data = raw.trim().split(/\s*(\d+):\s/);
  let lookup = {};

  for (let i = 1; i < s.length - 2; i += 2) {
    let key = data[i];
    let value = data[i + 1];
    lookup[key] = value;
  }

  return lookup
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
  new Parameter(   0, "Program Name",      0x00, 0x00, lookupName),
  new Parameter(  12, "Category",          0x00, 0x0C, "Synth,Lead,Bass,Brass,Strings,Piano,Key,SE/Voc,User"),
  new Parameter(  13, "Voice Mode",        0x00, 0x0D, "Single,Layer,Split"),
  new Parameter(  14, "TimbreB MIDI Ch.",  0x00, 0x0E, "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,Global"),
  new Parameter(  15, "Split Key",         0x00, 0x0F, lookupSplitKey),
  new ParamGroup( 16, "Timbre A",          0x20, 0x00, [
    // Voice
    new Parameter(  0, "Voice Assign",         0x00, 0x00, "Mono1,Mono2,Poly", "Voice"),
    new Parameter(  1, "Unison SW",            0x00, 0x01, "OFF,2 Voice,3 Voice,4 Voice", "Voice"),
    new Parameter(  2, "Unison Detune",        0x00, 0x02, "0~99:0~99[cent]", "Voice"),
    new Parameter(  3, "Unison Spread",        0x00, 0x03, null, "Voice"),

    // Pitch
    new Parameter(  4, "Transpose",       0x00, 0x04, "-48~0~48[note]", "Pitch"),
    new Parameter(  5, "Detune",          0x00, 0x05, "-50~0~50[cent]", "Pitch"),
    new Parameter(  6, "LFO2ModInt",      0x00, 0x06, "-63~0~63", "Pitch"),
    new Parameter(  7, "LFO2 & JS+Y",     0x00, 0x07, "-63~0~63:-2400~0~2400[cent]   *T02-1", "Pitch"),
    new Parameter(  8, "Bend Range",      0x00, 0x08, "-12~0~12[note]", "Pitch"),
    new Parameter(  9, "Portamento SW",   0x00, 0x09, "0,1:Off,On", "Pitch"),
    new Parameter( 10, "Portamento Time", 0x00, 0x0A, "0~127", "Pitch"),
    new Parameter( 11, "Analog Tuning",   0x00, 0x0B, "0~127", "Pitch"),

    // OSC 1 Data
    new ParamGroup( 12, "Osc 1 Data", 0x00, 0x0C, [
      new Parameter(  0, "Osc Type",  0x00, 0x00, null),
      new Parameter(  1, "Semitone",  0x00, 0x01, null),
      new Parameter(  2, "Tune",      0x00, 0x02, null),
      new Parameter(  3, "CTRL1",     0x00, 0x03, null),
      new Parameter(  4, "CTRL1",     0x00, 0x04, null)
    ], "Osc"),

    // OSC 2 Data
    new ParamGroup( 20, "Osc 2 Data",          0x00, 0x11, [
      new Parameter(  0, "Osc Type",  0x00, 0x00, null),
      new Parameter(  1, "Semitone",  0x00, 0x01, null),
      new Parameter(  2, "Tune",      0x00, 0x02, null),
      new Parameter(  3, "CTRL1",     0x00, 0x03, null),
      new Parameter(  4, "CTRL1",     0x00, 0x04, null)
    ], "Osc"),

    // OSC 3 Data
    new ParamGroup( 28, "Osc 3 Data",          0x00, 0x16, [
      new Parameter(  0, "Osc Type",  0x00, 0x00, null),
      new Parameter(  1, "Semitone",  0x00, 0x01, null),
      new Parameter(  2, "Tune",      0x00, 0x02, null),
      new Parameter(  3, "CTRL1",     0x00, 0x03, null),
      new Parameter(  4, "CTRL1",     0x00, 0x04, null)
    ], "Osc"),

    // Mixer
    new Parameter( 36, "Osc 1 Level",   0x00, 0x1B, "0~127", "Mixer"),
    new Parameter( 37, "Osc 2 Level",   0x00, 0x1C, "0~127", "Mixer"),
    new Parameter( 38, "Osc 3 Level",   0x00, 0x1D, "0~127", "Mixer"),

    // Filter
    new Parameter( 39, "Type",            0x00, 0x1E, "0~17                          *T02-2", "Filter"),
    new Parameter( 40, "Cutoff",          0x00, 0x1F, null, "Filter"),
    new Parameter( 41, "Resonance",       0x00, 0x20, null, "Filter"),
    new Parameter( 42, "EG1 Intensity",   0x00, 0x21, "-63~0~63", "Filter"),
    new Parameter( 43, "LFO1 Mod Int.",   0x00, 0x22, "-63~0~63", "Filter"),
    new Parameter( 44, "LFO1 & JS-Y",     0x00, 0x23, "-63~0~63", "Filter"),
    new Parameter( 45, "Keyboard Track",  0x00, 0x24, "-63~0~63:-2.00~0~2.00         *T02-3", "Filter"),
    new Parameter( 46, "Velocity Sens",   0x00, 0x25, "-63~0~63", "Filter"),

    // Amp
    new Parameter( 47, "Level",       0x00, 0x26, "0~127", "Amp"),
    new Parameter( 48, "Panpot",      0x00, 0x27, null, "Amp"),
    new Parameter( 49, "Punch Level", 0x00, 0x28, null, "Amp"),
    new Parameter( 50, "Key Track",   0x00, 0x29, null, "Amp"),
  ])
];

export default programParameters;
