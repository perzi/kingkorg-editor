import Parameter          from 'data/Parameter';
import ParamGroup         from 'data/ParameterGroup';
import { getValuesFromRefs, parseValueTable, parseValueDefinition } from 'data/parser'
import { referenceTableStrings, oscTypeRawDictionary }  from 'data/programSourceData';


// TODO: remove id? not used anywhere unless for debugging
//
// Map for reference
//
// When parsing a parameter, there can be a reference to a value lookup, that unparsed value will be the key
// and value will be an object, for instance:
// {
//   id: "unison_sw",
//   min: 0,
//   max: 1,
//   mappings: [
//        { value: 0, text: "Off" },
//        { value: 1, text: "On" }
//   ]
// }

// TODO: implement parameter value type and return to string there
// and don't use any lookup for name, just return array of values
//
// Lookups
//
let lookupName = (value, data) => {
  var name = "";
  for (let i = 0; i < 12; i++) {
    if (data[i] !== 0)
      name = name + String.fromCharCode(data[i]);
  }
  return name;
};


//
// Populate refs with data
//
let refs = referenceTableStrings.reduce((total, dataString) => {
  let data = parseValueTable(dataString);
  return Object.assign(total, { [data.id]: data});
}, {});


// TODO: implement parsing for this, remove type and use a formatter instead
refs["0,1~64~127:L63,L63~CNT~R63"] = (() => {
  let mappings = [];
  for (let i = 0; i <= 127; i++) {
    let text;

    if (i === 0) text = "L63";
    else if (i < 64) text = `L${64 - i}`;
    else if (i > 64) text = `R${i - 64}`;
    else text = "CNT";

    mappings.push({ value: i, text: text });
  }

  return {
    id: "0,1~64~127:L63,L63~CNT~R63",
    min: 0,
    max: 127,
    center: 64,
    type: "",
    mappings: mappings
  }
})();




// Value string parser
let parseValueString = (s) => {

  // get value from refs if it already exist
  let tableRef = getValuesFromRefs(s, refs);
  if (tableRef) {
    return tableRef;
  }

  if (refs[s]) {
    return refs[s];
  }

  // parse value and add to refs
  let result = parseValueDefinition(s);
  refs[s] = result;

  return result;
}


let oscTypeDictionary = oscTypeRawDictionary.map((row, index) => {
  return {
    value:     index,
    name:      row.substr( 0, 16).trim(),
    ctrl1Name: row.substr(16, 16).trim(),
    ctrl2Name: row.substr(48, 16).trim(),
    category:  row.substr(64, 16).trim()
  }
});

function generateOscLookup(id, field) {
  let lookup = {
    id: id,
    min: 0,
    max: oscTypeDictionary.length - 1,
    values: {}
  };

  oscTypeDictionary.forEach(item => lookup.values[item.value] = item[field]);

  return lookup;
}

// TODO: use function for these lookups, that will return correct lookup depending on osc type
// TODO: add to refs somehow?
let oscCtrl1Lookup = generateOscLookup("osc_ctrl1", "ctrl1Name");
let oscCtrl2Lookup = generateOscLookup("osc_ctrl2", "ctrl2Name");


//
// Parameter generator functions
//
let createParam = function(sourceString, offset, name, midiId, midiSubId, lookup, category, id, length, bit) {

  // sourceString
  // sourceString, category
  // sourceString, category, id

  const rangeOffset = [1, 12];
  const rangeParameter = [13, 32];
  const rangeValue = [33, 71];
  const rangeMidiId = [72, 82];

  // TODO: change this later when we can parse almost anything
  // and deal with arguments in a nices way
  if ((arguments.length === 2) || (arguments.length === 3)) {
    category = offset;
  }

  if (arguments.length === 3) {
    id = name;
  }

  if (typeof sourceString === "string" && sourceString.length > 0) {

    let offsetString = sourceString.substring.apply(sourceString, rangeOffset).trim();
    let nameString = sourceString.substring.apply(sourceString, rangeParameter).trim();
    let valueString = sourceString.substring.apply(sourceString, rangeValue).trim();
    let midiIdString = sourceString.substring.apply(sourceString, rangeMidiId).trim();

    offset = parseInt(offsetString, 10);
    name = nameString;
    lookup = parseValueString(valueString);

    [midiId, midiSubId] = midiIdString.split(":");

    midiId = parseInt(midiId, 16);
    midiSubId = parseInt(midiSubId, 16);

    // No id supplied
    if (typeof id === "undefined") {
      id = name.toLowerCase().replace(/[^\s\w_-]*/g, "").replace(/\s+/g, "_");
    }
  }

  if (typeof lookup === "string") {
    lookup = parseValueString(lookup);
  }

  return new Parameter(offset, name, midiId, midiSubId, lookup, category, id, length, bit);
};

let programParameters = () => {
  return new ParamGroup(0, "Program", 0x00, 0x00, [
      createParam("",   0, "Program Name",      0x00, 0x00, lookupName, null, "program_name", 12),
      createParam("| 12        | category          | 0~8:Synth~User                *T01-1 | 00:0C    |"),
      createParam("| 13        | Voice Mode        | 0~2:Single,Layer,Split               | 00:0D    |"),
      createParam("| 14        | TimbreB MIDI Ch.  | 0~15,16~:1~16,Global                 | 00:0E    |"),
      createParam("| 15        | Split Key         | 0~127:C-1~G9                  *T01-2 | 00:0F    |"),
      new ParamGroup( 16, "Timbre A",          0x02, 0x00, timbreParameters(),    null, "timbre_a"),
      new ParamGroup(100, "V.Patch A",         0x03, 0x00, vPatchParameters(),    null, "vpatch_a"),
      new ParamGroup(124, "Timbre B",          0x04, 0x00, timbreParameters(),    null, "timbre_b"),
      new ParamGroup(208, "V.Patch B",         0x05, 0x00, vPatchParameters(),    null, "vpatch_b"),

      // These groups are absolutely defined in spec, so use
      new ParamGroup(232, "FX",                0x00, 0x00, fxParameters(),        null, "fx"),
      new ParamGroup(244, "Vocoder",           0x00, 0x00, vocoderParameters(),   null, "vocoder"),
      new ParamGroup(296, "Arpeggio",          0x00, 0x00, arpeggioParameters(),  null, "arpeggio"),
      createParam("| 312       | Key Response      | 0~2:Normal,Shallow,Deep              | 01:00    |")
  ]);
}

let timbreParameters = () => {
  return [
    // Voice
    createParam("| +0        | Voice Assign      | 0~2:Mono1,Mono2,Poly                 | +0:00    |", "Voice"),
    createParam("| +1        | Unison SW         | 0,1~3:OFF,2~4Voice                   | +0:01    |", "Voice"),
    createParam("| +2        | Unison Detune     | 0~99:0~99[cent]                      | +0:02    |", "Voice"),
    createParam("| +3        | Unison Spread     | 0~127                                | +0:03    |", "Voice"),

    // Pitch
    createParam("| +4        | Transpose         | -48~0~48[note]                       | +0:04    |", "Pitch", "pitch_transpose"),
    createParam("| +5        | Detune            | -50~0~50[cent]                       | +0:05    |", "Pitch", "pitch_detune"),
    createParam("| +6        | LFO2ModInt        | -63~0~63                             | +0:06    |", "Pitch", "pitch_lfo2modint"),
    createParam("| +7        | LFO2 & JS+Y       | -63~0~63:-2400~0~2400[cent]   *T02-1 | +0:07    |", "Pitch", "pitch_lfo2jsy"),
    createParam("| +8        | Bend Range        | -12~0~12[note]                       | +0:08    |", "Pitch", "pitch_bendrange"),
    createParam("| +9        | Portamento SW     | 0,1:Off,On                           | +0:09    |", "Pitch", "pitch_portamento_sw"),
    createParam("| +10       | Portamento Time   | 0~127                                | +0:0A    |", "Pitch", "pitch_portamento_time"),
    createParam("| +11       | Analog Tuning     | 0~127                                | +0:0B    |", "Pitch", "pitch_analog_tuning"),

    // OSC 1 Data
    new ParamGroup( 12, "Oscillator 1", 0x00, 0x0C, oscParameters(1), "Osc", "osc_1"),

    // OSC 2 Data
    new ParamGroup( 20, "Oscillator 2", 0x00, 0x11, oscParameters(2), "Osc", "osc_2"),

    // OSC 3 Data
    new ParamGroup( 28, "Oscillator 3", 0x00, 0x16, oscParameters(3), "Osc", "osc_3"),

    // Mixer
    createParam("| +36       | Osc1 Level        | 0~127                                | +0:1B    |", "Mixer"),
    createParam("| +37       | Osc2 Level        | 0~127                                | +0:1C    |", "Mixer"),
    createParam("| +38       | Osc3 Level        | 0~127                                | +0:1D    |", "Mixer"),

    // Filter
    createParam("| +39       | Type              | 0~17                          *T02-2 | +0:1E    |", "Filter"),
    createParam("| +40       | Cutoff            | 0~127                                | +0:1F    |", "Filter"),
    createParam("| +41       | Resonance         | 0~127                                | +0:20    |", "Filter"),
    createParam("| +42       | EG1 Intensity     | -63~0~63                             | +0:21    |", "Filter"),
    createParam("| +43       | LFO1 Mod Int.     | -63~0~63                             | +0:22    |", "Filter"),
    createParam("| +44       | LFO1 & JS-Y       | -63~0~63                             | +0:23    |", "Filter"),
    createParam("| +45       | Keyboard Track    | -63~0~63:-2.00~0~2.00         *T02-3 | +0:24    |", "Filter"),
    createParam("| +46       | Velocity Sens     | -63~0~63                             | +0:25    |", "Filter"),

    // Amp
    createParam("| +47       | Level             | 0~127                                | +0:26    |", "Amp"),

    // TODO: handle tri-state definitions
    createParam("| +48       | Panpot            | 0,1~64~127:L63,L63~CNT~R63           | +0:27    |", "Amp"),
    createParam("| +49       | Punch Level       | 0~127                                | +0:28    |", "Amp"),
    createParam("| +50       | Key Track         | -63~0~63                             | +0:29    |", "Amp"),

    // EG
    new ParamGroup( 52, "EG 1", 0x00, 0x2A, egParameters(), "EG", "eg_1"),
    new ParamGroup( 60, "EG 2", 0x00, 0x2F, egParameters(), "EG", "eg_2"),

    // LFO
    new ParamGroup( 0, "LFO 1", 0x00, 0x00, [
      createParam("| +68       | Wave              | 0~4:Saw,Square,Triangle,S/H,Random   | +0:34    |", "LFO 1"),
      createParam("| +69       | Frequency         | 0~127:0.01~100[kHz]           *T02-4 | +0:35    |", "LFO 1"),
      createParam("| +70       | Key Sync          | 0~2:Off,Timbre,Voice                 | +0:36    |", "LFO 1"),
      createParam("| +71       | Tempo Sync        | 0,1:Off,On                           | +0:37    |", "LFO 1"),
      createParam("| +72       | Sync Note         | 0~16:8/1~1/64                 *T02-5 | +0:38    |", "LFO 1")
    ], "LFO", "lfo_1"),

    new ParamGroup( 0, "LFO 2", 0x00, 0x00, [
      createParam("| +76       | Wave              | 0~4:Saw,Square+,Sine,S/H,Random      | +0:39    |", "LFO 2"),
      createParam("| +77       | Frequency         | 0~127:0.01~100[kHz]           *T02-4 | +0:3A    |", "LFO 2"),
      createParam("| +78       | Key Sync          | 0~2:Off,Timbre,Voice                 | +0:3B    |", "LFO 2"),
      createParam("| +79       | Tempo Sync        | 0,1:Off,On                           | +0:3C    |", "LFO 2"),
      createParam("| +80       | Sync Note         | 0~16:8/1~1/64                 *T02-5 | +0:3D    |", "LFO 2")
    ], "LFO", "lfo_2")
  ];
};

let oscParameters = (index) => {
  return [
    createParam("| +0        | OSC Type          | 0~127                         *T07-3 | +0:+0    |", `Osc ${index}`,  "type"),
    createParam("| +1        | Semitone          | -24~0~24[note]                       | +0:+1    |", `Osc ${index}`),
    createParam("| +2        | Tune              | -63~0~63                             | +0:+2    |", `Osc ${index}`),
    createParam("", 3, "CTRL1"    , 0x00, 0x03, oscCtrl1Lookup,         `Osc ${index}`,   "ctrl1"),
    createParam("", 4, "CTRL2"    , 0x00, 0x04, oscCtrl2Lookup,         `Osc ${index}`,   "ctrl2")
  ]
};

let egParameters = () => {
  return [
    createParam("| +0        | Attack Time       | 0~127                                | +0:+0    |", "EG"),
    createParam("| +1        | Decay Time        | 0~127                                | +0:+1    |", "EG"),
    createParam("| +2        | Sustain Level     | 0~127                                | +0:+2    |", "EG"),
    createParam("| +3        | Release Time      | 0~127                                | +0:+3    |", "EG"),
    createParam("| +4        | Level Velo Int.   | -63~0~63                             | +0:+4    |", "EG")
  ]
};

let vPatchParameters = () => [
  new ParamGroup( 0, "V.Patch 1", 0x00, 0x00, vPatchParameter(), "VPATCH", "vpatch_1"),
  new ParamGroup( 4, "V.Patch 2", 0x00, 0x03, vPatchParameter(), "VPATCH", "vpatch_2"),
  new ParamGroup( 8, "V.Patch 3", 0x00, 0x06, vPatchParameter(), "VPATCH", "vpatch_3"),
  new ParamGroup(12, "V.Patch 4", 0x00, 0x09, vPatchParameter(), "VPATCH", "vpatch_4"),
  new ParamGroup(16, "V.Patch 5", 0x00, 0x0C, vPatchParameter(), "VPATCH", "vpatch_5"),
  new ParamGroup(20, "V.Patch 6", 0x00, 0x0F, vPatchParameter(), "VPATCH", "vpatch_6")
];

let vPatchParameter = () => [
  createParam("| +0        | Patch Source      | 0~11:EG1~MIDI3                *T05-1 | +0:+0    |"),
  createParam("| +1        | Patch Destination | 0~41:Off~Rev/Delay Time       *T09-1 | +0:+1    |"),
  createParam("| +2        | Patch Intensity   | -63~0~63                             | +0:+2    |")
];

let fxParameters = () => [
  createParam("| +0        | PreFX Type        | 0~5:DISTORTION~TONE           *T04-1 | 06:00    |", "FX"),
  createParam("| +1        | PreFX SW          | 0~3:Off,TimbreA,TimbreB,TimbreA+B    | 06:01    |", "FX"),

  // TODO: implement dynamic naming + range of control
  // createParam("| +2        | PreFX Drive/Freq  | 0~127                           *4-9 | 06:02    |", "FX"),
  createParam("| +2        | PreFX Drive/Freq  | 0~127                                | 06:02    |", "FX"),

  createParam("| +3        | ModFX Type        | 0~5:FLANGER~ROTARY            *T04-2 | 06:03    |", "FX"),
  createParam("| +4        | ModFX SW          | 0~3:Off,TimbreA,TimbreB,TimbreA+B    | 06:04    |", "FX"),
  createParam("| +5        | ModFX Depth       | 0~127                                | 06:05    |", "FX"),
  createParam("| +6        | ModFX Speed       | 0~127                                | 06:06    |", "FX"),
  createParam("| +7        | Rev/Dly Type      | 0~5:HALL~BPM DELAY            *T04-3 | 06:07    |", "FX"),
  createParam("| +8        | Rev/Dly SW        | 0~3:Off,TimbreA,TimbreB,TimbreA+B    | 06:08    |", "FX"),
  createParam("| +9        | Rev/Dly Depth     | 0~127                                | 06:09    |", "FX"),

  // TODO: implement dynamic naming + range of control
  // createParam("| +10       | Rev/Dly Time      | 0~127                          *4-10 | 06:0A    |", "FX")
  createParam("| +10       | Rev/Dly Time      | 0~127                                | 06:0A    |", "FX")
];

let vocoderParameters = () => [

  createParam("| +0        | SW                | 0,1:Dis,Ena                          | 07:00    |", ""),
  createParam("| +1        | TimbreA Level     | 0~127                                | 07:01    |", "Carrier"),
  createParam("| +2        | TimbreB Level     | 0~127                                | 07:02    |", "Carrier"),
  createParam("| +3        | Audio Source      | 0,1:Input,TimbreB                    | 07:03    |", "Modulator"),
  createParam("| +4        | Gate Sens         | 0~127                                | 07:04    |", "Modulator"),
  createParam("| +5        | Threshold         | 0~127                                | 07:05    |", "Modulator"),
  createParam("| +6        | HPF Level         | 0~127                                | 07:06    |", "Modulator"),
  createParam("| +7        | HPF Gate          | 0,1:Dis,Ena                          | 07:07    |", "Modulator"),
  createParam("| +8        | Formanto Shift    | 0~2~4:-2~0~2                         | 07:08    |", "Filter"),
  createParam("| +9        | Fc offset         | -63~0~63                             | 07:09    |", "Filter"),
  createParam("| +10       | Resonance         | 0~127                                | 07:0A    |", "Filter"),
  createParam("| +11       | Fc Mod Source     | 0~11:EG1~MIDI3                *T05-1 | 07:0B    |", "Filter"),
  createParam("| +12       | Fc Mod Intensity  | -63~0~63                             | 07:0C    |", "Filter"),
  createParam("| +13       | E.F.Sens          | 0~126,127:0~126,Hold                 | 07:0D    |", "Filter"),

  // Formant Hold Data
  createParam("", 16, "Band 1",              0x07, 0x0E, null, "Formant Hold", "band_1", 2),
  createParam("", 18, "Band 2",              0x07, 0x0F, null, "Formant Hold", "band_2", 2),
  createParam("", 20, "Band 3",              0x07, 0x10, null, "Formant Hold", "band_3", 2),
  createParam("", 22, "Band 4",              0x07, 0x11, null, "Formant Hold", "band_4", 2),
  createParam("", 24, "Band 5",              0x07, 0x12, null, "Formant Hold", "band_5", 2),
  createParam("", 26, "Band 6",              0x07, 0x13, null, "Formant Hold", "band_6", 2),
  createParam("", 28, "Band 7",              0x07, 0x14, null, "Formant Hold", "band_7", 2),
  createParam("", 30, "Band 8",              0x07, 0x15, null, "Formant Hold", "band_8", 2),
  createParam("", 32, "Band 9",              0x07, 0x16, null, "Formant Hold", "band_9", 2),
  createParam("", 34, "Band 10",             0x07, 0x17, null, "Formant Hold", "band_10", 2),
  createParam("", 36, "Band 11",             0x07, 0x18, null, "Formant Hold", "band_11", 2),
  createParam("", 38, "Band 12",             0x07, 0x19, null, "Formant Hold", "band_12", 2),
  createParam("", 40, "Band 13",             0x07, 0x1A, null, "Formant Hold", "band_13", 2),
  createParam("", 42, "Band 14",             0x07, 0x1B, null, "Formant Hold", "band_14", 2),
  createParam("", 44, "Band 15",             0x07, 0x1C, null, "Formant Hold", "band_15", 2),
  createParam("", 46, "Band 16",             0x07, 0x1D, null, "Formant Hold", "band_16", 2),

  // Amp
  createParam("| +48       | Vocoder Level     | 0~127                                | 07:1E    |", "Amp"),
  createParam("| +49       | Direct Level      | 0~127                                | 07:1F    |", "Amp"),
  createParam("| +50       | Wet Spread        | 0~127                                | 07:20    |", "Amp"),
  createParam("| +51       | Wet Level         | 0~127                                | 07:21    |", "Amp"),
];

let arpeggioParameters = () => [
  createParam("",  0, "Tempo", 0x08, 0x01, "20~300",     "Arpeggio", "tempo", 2),
  createParam("| +2        | Arp SW            | 0,1:Off,On                           | 08:00    |", "Arpeggio"),
  createParam("| +3        | Latch             | 0,1:Off,On                           | 08:02    |", "Arpeggio"),
  createParam("| +4        | Key Sync          | 0,1:Off,On                           | 08:03    |", "Arpeggio"),
  createParam("| +5        | Timbre Assign     | 0~2:TimbreA,TimbreB,TimbreA+B        | 08:04    |", "Arpeggio"),
  createParam("| +6        | Type              | 0~5:Up~Trigger                *T06-1 | 08:05    |", "Arpeggio"),
  createParam("| +7        | Resolution        | 0~8:1/32~1/1                  *T06-2 | 08:06    |", "Arpeggio"),
  createParam("| +8        | gate time         | 0~100:0~100[%]                       | 08:07    |", "Arpeggio"),
  createParam("| +9        | Swing             | -100~0~100[%]                        | 08:08    |", "Arpeggio"),
  createParam("| +10       | Last step         | 1~8:1~8 step                         | 08:09    |", "Arpeggio"),
  createParam("| +11       | Octave Range      | 1~4:1~4 Octave                       | 08:0A    |", "Arpeggio"),

  // Steps are implemented as bits
  createParam("", 12, "Step",                0x08, 0x0B, "0,1:Off,On", "Arpeggio", "step_0", 1, 0),
  createParam("", 12, "Step",                0x08, 0x0C, "0,1:Off,On", "Arpeggio", "step_1", 1, 1),
  createParam("", 12, "Step",                0x08, 0x0D, "0,1:Off,On", "Arpeggio", "step_2", 1, 2),
  createParam("", 12, "Step",                0x08, 0x0E, "0,1:Off,On", "Arpeggio", "step_3", 1, 3),
  createParam("", 12, "Step",                0x08, 0x0F, "0,1:Off,On", "Arpeggio", "step_4", 1, 4),
  createParam("", 12, "Step",                0x08, 0x10, "0,1:Off,On", "Arpeggio", "step_5", 1, 5),
  createParam("", 12, "Step",                0x08, 0x11, "0,1:Off,On", "Arpeggio", "step_6", 1, 6),
  createParam("", 12, "Step",                0x08, 0x12, "0,1:Off,On", "Arpeggio", "step_7", 1, 7),
];


export { oscTypeDictionary };
export default programParameters();
