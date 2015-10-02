class Parameter {
  constructor(offset, name, midiId, midiSubId, lookup, category, id) {
    this.offset = offset;
    this.name = name;
    this.midiId = midiId;
    this.lookup = lookup || null;
    this.midiSubId = midiSubId;
    this.category = category || "";
    this.id = id;
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
  }

  getOffset() {
    if (this.parent) {
      return this.offset + this.parent.getOffset();
    } else {
      return this.offset;
    }
  }

  getValue(programData) {
    return programData[this.getOffset()];
  }

  getValueAsText(programData) {
    let value = programData[this.getOffset()];
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


let oscTypeRawDictionary = [
  "Off             -               -               ",
  "Saw             Waveform        -               Analog",
  "Pulse           PulseWidth      -               Analog",
  "Triangle        Waveform        -               Analog",
  "Sine            Waveform        -               Analog",
  "White Noise     Decimator Fc    Noise Decay     Analog",
  "Pink Noise      LPF Cutoff      Noise Decay     Analog",
  "Blue Noise      HPF Cutoff      Noise Decay     Analog",
  "Res. Noise      Resonance       Noise Decay     Analog",
  "Dual Saw        Detune          -               Analog",
  "Dual Square     Detune          -               Analog",
  "Dual Tri.       Detune          -               Analog",
  "Dual Sine       Detune          -               Analog",
  "Unison Saw      Detune          -               Analog",
  "Unison Squ.     Detune          -               Analog",
  "Unison Tri.     Detune          -               Analog",
  "Unison Sine     Detune          -               Analog",
  "Sync Saw        Mod Pitch       -               Analog",
  "Sync Square     Mod Pitch       -               Analog",
  "Sync Tri.       Mod Pitch       -               Analog",
  "Sync Sine       Mod Pitch       -               Analog",
  "Ring Saw        Mod Pitch       -               Analog",
  "Ring Square     Mod Pitch       -               Analog",
  "Ring Tri.       Mod Pitch       -               Analog",
  "Ring Sine       Mod Pitch       -               Analog",
  "XMod Saw        Mod Depth       Mod Pitch       Analog",
  "XMod Square     Mod Depth       Mod Pitch       Analog",
  "XMod Tri.       Mod Depth       Mod Pitch       Analog",
  "XMod Sine       Mod Depth       Mod Pitch       Analog",
  "VPM Saw         Mod Depth       Mod Harm        Analog",
  "VPM Square      Mod Depth       Mod Harm        Analog",
  "VPM Tri.        Mod Depth       Mod Harm        Analog",
  "VPM Sine        Mod Depth       Mod Harm        Analog",
  "Syn Sine 1      Detune          -               DWGS",
  "Syn Sine 2      Detune          -               DWGS",
  "Syn Sine 3      Detune          -               DWGS",
  "Syn Sine 4      Detune          -               DWGS",
  "Syn Sine 5      Detune          -               DWGS",
  "Syn Sine 6      Detune          -               DWGS",
  "Syn Sine 7      Detune          -               DWGS",
  "Syn Sine 8      Detune          -               DWGS",
  "Syn Sine 9      Detune          -               DWGS",
  "Syn Wave 1      Detune          -               DWGS",
  "Syn Wave 2      Detune          -               DWGS",
  "Syn Wave 3      Detune          -               DWGS",
  "Syn Wave 4      Detune          -               DWGS",
  "Syn Wave 5      Detune          -               DWGS",
  "Syn Wave 6      Detune          -               DWGS",
  "Syn Wave 7      Detune          -               DWGS",
  "Syn Wire 1      Detune          -               DWGS",
  "Syn Wire 2      Detune          -               DWGS",
  "Syn Wire 3      Detune          -               DWGS",
  "Syn Wire 4      Detune          -               DWGS",
  "5th Saw         Detune          -               DWGS",
  "5th Square      Detune          -               DWGS",
  "Inharm 1        Detune          -               DWGS",
  "Inharm 2        Detune          -               DWGS",
  "Inharm 3        Detune          -               DWGS",
  "Inharm 4        Detune          -               DWGS",
  "Inharm 5        Detune          -               DWGS",
  "Inharm 6        Detune          -               DWGS",
  "Inharm 7        Detune          -               DWGS",
  "Inharm 8        Detune          -               DWGS",
  "Inharm 9        Detune          -               DWGS",
  "Digital 1       Detune          -               DWGS",
  "Digital 2       Detune          -               DWGS",
  "Digital 3       Detune          -               DWGS",
  "Digital 4       Detune          -               DWGS",
  "Digital 5       Detune          -               DWGS",
  "Digital 6       Detune          -               DWGS",
  "Digital 7       Detune          -               DWGS",
  "Digital 8       Detune          -               DWGS",
  "Digital 9       Detune          -               DWGS",
  "E.Piano 1       Detune          -               DWGS",
  "E.Piano 2       Detune          -               DWGS",
  "E.Piano 3       Detune          -               DWGS",
  "E.Piano 4       Detune          -               DWGS",
  "Organ 1         Detune          -               DWGS",
  "Organ 2         Detune          -               DWGS",
  "Organ 3         Detune          -               DWGS",
  "Organ 4         Detune          -               DWGS",
  "Organ 5         Detune          -               DWGS",
  "Organ 6         Detune          -               DWGS",
  "Organ 7         Detune          -               DWGS",
  "Clav 1          Detune          -               DWGS",
  "Clav 2          Detune          -               DWGS",
  "Guitar 1        Detune          -               DWGS",
  "Guitar 2        Detune          -               DWGS",
  "E.Bass 1        Detune          -               DWGS",
  "E.Bass 2        Detune          -               DWGS",
  "E.Bass 3        Detune          -               DWGS",
  "Bell 1          Detune          -               DWGS",
  "Bell 2          Detune          -               DWGS",
  "Bell 3          Detune          -               DWGS",
  "Bell 4          Detune          -               DWGS",
  "Syn Vox 1       Detune          -               DWGS",
  "Syn Vox 2       Detune          -               DWGS",
  "A.Piano         -               -               PCM",
  "E.Grand         -               -               PCM",
  "Tine EP         -               -               PCM",
  "Dyno EP         -               -               PCM",
  "Wurly EP        -               -               PCM",
  "Clav 1          -               -               PCM",
  "Clav 2          -               -               PCM",
  "Organ 1         -               -               PCM",
  "Organ 2         -               -               PCM",
  "Organ 3         -               -               PCM",
  "M1 Organ        -               -               PCM",
  "Vox Organ       -               -               PCM",
  "Marimba         -               -               PCM",
  "Bell 1          -               -               PCM",
  "Bell 2          -               -               PCM",
  "Tape Flute      -               -               PCM",
  "Brass 1         -               -               PCM",
  "Brass 2         -               -               PCM",
  "Trumpet         -               -               PCM",
  "Strings         -               -               PCM",
  "Tape Str.       -               -               PCM",
  "Choir 1         -               -               PCM",
  "Choir 2         -               -               PCM",
  "Choir 3         -               -               PCM",
  "A.Guitar        -               -               PCM",
  "E.Guitar        -               -               PCM",
  "A.Bass          -               -               PCM",
  "E.Bass 1        -               -               PCM",
  "E.Bass 2        -               -               PCM",
  "E.Bass 3        -               -               PCM",
  "Mic In          Gain            -               MIC IN"
];

let oscTypeDictionary = oscTypeRawDictionary.map((row, index) => {
    return {
      value: index,
      name: row.substr(0, 16).trim(),
      ctrl1Name: row.substr(16, 16).trim(),
      ctrl2Name: row.substr(32, 16).trim(),
      category: row.substr(48, 16).trim()
    }
});

let oscTypeNames = oscTypeDictionary.map(item => {
  return item.name;
});

let oscParameters = () => {
  return [
    new Parameter(  0, "Type",  0x00, 0x00, oscTypeNames),
    new Parameter(  1, "Semitone",  0x00, 0x01, null),
    new Parameter(  2, "Tune",      0x00, 0x02, null),
    new Parameter(  3, "CTRL1",     0x00, 0x03, null),
    new Parameter(  4, "CTRL2",     0x00, 0x04, null)
  ]
}

let egParameters = () => {
  return [
    new Parameter(  0, "Attack",    0x00, 0x00, null, "EG", "attack"),
    new Parameter(  1, "Decay",     0x00, 0x01, null, "EG", "decay"),
    new Parameter(  2, "Sustain",   0x00, 0x02, null, "EG", "sustain"),
    new Parameter(  3, "Release",   0x00, 0x03, null, "EG", "release"),
    new Parameter(  4, "Level Velo Int.", 0x00, 0x04, "-63~0~63", "EG", "lvl_velo_int")
  ]
}

let lfoParameters = (lfoNum) => {

  // TODO: different wave lookups for each LFO

  return [
    new Parameter(  0, "Wave",       0x00, 0x00, null, "LFO", "wave"),
    new Parameter(  1, "Freqency",   0x00, 0x01, null, "LFO", "frequency"),
    new Parameter(  2, "Key Sync",   0x00, 0x02, null, "LFO", "key_sync"),
    new Parameter(  3, "Tempo Sync", 0x00, 0x03, null, "LFO", "tempo_sync"),
    new Parameter(  4, "Sync Note",  0x00, 0x04, null, "LFO", "sync_note")
  ]
}

let vPatchParameter = () => {
  return [
    new Parameter(  0, "Source",      0x00, 0x00, null, "EG", "source"),
    new Parameter(  1, "Destination", 0x00, 0x01, null, "EG", "destination"),
    new Parameter(  2, "Intensity",   0x00, 0x02, null, "EG", "intensity")
  ]
}

let vPatchParameters = () => {
  return [
    new ParamGroup( 0, "V.Patch 1", 0x00, 0x00, vPatchParameter(), "VPATCH", "vpatch_1"),
    new ParamGroup( 4, "V.Patch 2", 0x00, 0x03, vPatchParameter(), "VPATCH", "vpatch_2"),
    new ParamGroup( 8, "V.Patch 3", 0x00, 0x06, vPatchParameter(), "VPATCH", "vpatch_3"),
    new ParamGroup(12, "V.Patch 4", 0x00, 0x09, vPatchParameter(), "VPATCH", "vpatch_4"),
    new ParamGroup(16, "V.Patch 5", 0x00, 0x0C, vPatchParameter(), "VPATCH", "vpatch_5"),
    new ParamGroup(20, "V.Patch 6", 0x00, 0x0F, vPatchParameter(), "VPATCH", "vpatch_6")
  ]
}

let timbreParameters = () => {
  return [
    // Voice
    new Parameter(  0, "Voice Assign",         0x00, 0x00, "Mono1,Mono2,Poly", "Voice", "voice_assign"),
    new Parameter(  1, "Unison SW",            0x00, 0x01, "OFF,2 Voice,3 Voice,4 Voice", "Voice", "unison_sw"),
    new Parameter(  2, "Unison Detune",        0x00, 0x02, "0~99:0~99[cent]", "Voice", "unison_detune"),
    new Parameter(  3, "Unison Spread",        0x00, 0x03, null, "Voice", "unison_spread"),

    // Pitch
    new Parameter(  4, "Transpose",       0x00, 0x04, "-48~0~48[note]", "Pitch", "pitch_transpose"),
    new Parameter(  5, "Detune",          0x00, 0x05, "-50~0~50[cent]", "Pitch", "pitch_detune"),
    new Parameter(  6, "LFO2ModInt",      0x00, 0x06, "-63~0~63", "Pitch", "pitch_lfo2modint"),
    new Parameter(  7, "LFO2 & JS+Y",     0x00, 0x07, "-63~0~63:-2400~0~2400[cent]   *T02-1", "Pitch", "pitch_lfo2jsy"),
    new Parameter(  8, "Bend Range",      0x00, 0x08, "-12~0~12[note]", "Pitch", "pitch_bendrange"),
    new Parameter(  9, "Portamento SW",   0x00, 0x09, "Off,On", "Pitch", "pitch_portamento_sw"),
    new Parameter( 10, "Portamento Time", 0x00, 0x0A, null, "Pitch", "pitch_portamento_time"),
    new Parameter( 11, "Analog Tuning",   0x00, 0x0B, null, "Pitch", "pitch_analog_tuning"),

    // OSC 1 Data
    new ParamGroup( 12, "Oscillator 1", 0x00, 0x0C, oscParameters(), "Osc", "osc_1"),

    // OSC 2 Data
    new ParamGroup( 20, "Oscillator 2", 0x00, 0x11, oscParameters(), "Osc", "osc_2"),

    // OSC 3 Data
    new ParamGroup( 28, "Oscillator 3", 0x00, 0x16, oscParameters(), "Osc", "osc_3"),

    // Mixer
    new Parameter( 36, "Osc 1 Level",   0x00, 0x1B, null, "Mixer", "osc1_level"),
    new Parameter( 37, "Osc 2 Level",   0x00, 0x1C, null, "Mixer", "osc2_level"),
    new Parameter( 38, "Osc 3 Level",   0x00, 0x1D, null, "Mixer", "osc3_level"),

    // Filter
    new Parameter( 39, "Type",            0x00, 0x1E, "0~17                          *T02-2", "Filter", "filter_type"),
    new Parameter( 40, "Cutoff",          0x00, 0x1F, null, "Filter", "filter_cutoff"),
    new Parameter( 41, "Resonance",       0x00, 0x20, null, "Filter", "filter_resonance"),
    new Parameter( 42, "EG1 Intensity",   0x00, 0x21, "-63~0~63", "Filter", "filter_eg1int"),
    new Parameter( 43, "LFO1 Mod Int.",   0x00, 0x22, "-63~0~63", "Filter", "filter_lfo1modint"),
    new Parameter( 44, "LFO1 & JS-Y",     0x00, 0x23, "-63~0~63", "Filter", "filter_lfo1jsy"),
    new Parameter( 45, "Keyboard Track",  0x00, 0x24, "-63~0~63:-2.00~0~2.00         *T02-3", "Filter", "filter_keytrack"),
    new Parameter( 46, "Velocity Sens",   0x00, 0x25, "-63~0~63", "Filter", "filter_velocitysens"),

    // Amp
    new Parameter( 47, "Level",       0x00, 0x26, null, "Amp", "amp_level"),
    new Parameter( 48, "Panpot",      0x00, 0x27, null, "Amp", "amp_pan"),
    new Parameter( 49, "Punch Level", 0x00, 0x28, null, "Amp", "amp_punch"),
    new Parameter( 50, "Key Track",   0x00, 0x29, null, "Amp", "amp_keytrack"),

    // EG
    new ParamGroup( 52, "EG 1", 0x00, 0x2A, egParameters(), "EG", "eg_1"),
    new ParamGroup( 60, "EG 2", 0x00, 0x2F, egParameters(), "EG", "eg_2"),

    // LFO
    new ParamGroup( 68, "LFO 1", 0x00, 0x34, lfoParameters(1), "LFO", "lfo_1"),
    new ParamGroup( 76, "LOF 2", 0x00, 0x39, lfoParameters(2), "LFO", "lfo_2")
  ];
};


let program = new ParamGroup(0, "Program", 0x00, 0x00, [
    new Parameter(   0, "Program Name",      0x00, 0x00, lookupName),
    new Parameter(  12, "Category",          0x00, 0x0C, "Synth,Lead,Bass,Brass,Strings,Piano,Key,SE/Voc,User"),
    new Parameter(  13, "Voice Mode",        0x00, 0x0D, "Single,Layer,Split", null, "voice_mode"),
    new Parameter(  14, "TimbreB MIDI Ch.",  0x00, 0x0E, "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,Global"),
    new Parameter(  15, "Split Key",         0x00, 0x0F, lookupSplitKey),
    new ParamGroup( 16, "Timbre A",          0x20, 0x00, timbreParameters(), null, "timbre_a"),
    new ParamGroup(100, "V.Patch A",         0x30, 0x00, vPatchParameters(), null, "vpatch_a"),
    new ParamGroup(124, "Timbre B",          0x40, 0x00, timbreParameters(), null, "timbre_b"),
    new ParamGroup(208, "V.Patch B",         0x30, 0x00, vPatchParameters(), null, "vpatch_b")
]);

export { oscTypeDictionary };
export default program;
