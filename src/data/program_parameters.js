import Parameter from './parameter';
import ParamGroup from './parametergroup';
import source_data from './program_source_data';
import parser from './parser'

var refs = {};

source_data.refs.forEach((dataString) => {
  let data = parser.parseValueTable(dataString);
  refs[data.id] = data;
});

// TODO: the hard lookup values to parse can be generated and put in refs beforehand

let parseValueString = (s) => {

  if (refs[s]) {
    return refs[s];
  }

  let result = parser.parseValueString(s, refs);
  refs[s] = result;

  return result;
}


let createParam = function(sourceString, offset, name, midiId, midiSubId, lookup, category, id, length) {

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
    let valueString = sourceString.substring.apply(sourceString, rangeValue);
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

  return new Parameter(offset, name, midiId, midiSubId, lookup, category, id, length);
};

let programParameters = () => {
  return new ParamGroup(0, "Program", 0x00, 0x00, [
      createParam("",   0, "Program Name",      0x00, 0x00, lookupName, null, "program_name", 12),
      createParam("",  12, "Category",          0x00, 0x0C, "Synth,Lead,Bass,Brass,Strings,Piano,Key,SE/Voc,User", null, "category"),
      createParam("",  13, "Voice Mode",        0x00, 0x0D, "Single,Layer,Split",  null, "voice_mode"),
      createParam("",  14, "TimbreB MIDI Ch.",  0x00, 0x0E, "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,Global", null, "timbreb_midi_ch"),
      createParam("",  15, "Split Key",         0x00, 0x0F, lookupSplitKey),
      new ParamGroup( 16, "Timbre A",          0x20, 0x00, timbreParameters(),    null, "timbre_a"),
      new ParamGroup(100, "V.Patch A",         0x30, 0x00, vPatchParameters(),    null, "vpatch_a"),
      new ParamGroup(124, "Timbre B",          0x40, 0x00, timbreParameters(),    null, "timbre_b"),
      new ParamGroup(208, "V.Patch B",         0x50, 0x00, vPatchParameters(),    null, "vpatch_b"),
      new ParamGroup(232, "FX",                0x60, 0x00, fxParameters(),        null, "fx"),
      new ParamGroup(244, "Vocoder",           0x70, 0x00, vocoderParameters(),   null, "vocoder"),
      new ParamGroup(296, "Arpeggio",          0x80, 0x00, arpeggioParameters(),  null, "arpeggio"),
      createParam("", 312, "Key response",      0x10, 0x00, "Normal,Shallow,Deep", null, "key_response")
  ]);
}

let timbreParameters = () => {
  return [
    // Voice
    createParam("| +0        | Voice Assign      | 0~2:Mono1,Mono2,Poly                 | +0:00    |", "Voice"),
    createParam(null,  1, "Unison SW",            0x00, 0x01, null, "Voice", "unison_sw"),
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
    new ParamGroup( 12, "Oscillator 1", 0x00, 0x0C, oscParameters(), "Osc", "osc_1"),

    // OSC 2 Data
    new ParamGroup( 20, "Oscillator 2", 0x00, 0x11, oscParameters(), "Osc", "osc_2"),

    // OSC 3 Data
    new ParamGroup( 28, "Oscillator 3", 0x00, 0x16, oscParameters(), "Osc", "osc_3"),

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
    createParam("| +48       | Panpot            | 0,1~64~127:L63,L63~CNT~R63           | +0:27    |", "Amp"),
    createParam("| +49       | Punch Level       | 0~127                                | +0:28    |", "Amp"),
    createParam("| +50       | Key Track         | -63~0~63                             | +0:29    |", "Amp"),

    // EG
    new ParamGroup( 52, "EG 1", 0x00, 0x2A, egParameters(), "EG", "eg_1"),
    new ParamGroup( 60, "EG 2", 0x00, 0x2F, egParameters(), "EG", "eg_2"),

    // LFO
//    new ParamGroup( 68, "LFO 1", 0x00, 0x34, [
    new ParamGroup( 0, "LFO 1", 0x00, 0x00, [
      createParam("| +68       | Wave              | 0~4:Saw,Square,Triangle,S/H,Random   | +0:34    |", "LFO 1"),
      createParam("| +69       | Frequency         | 0~127:0.01~100[kHz]           *T02-4 | +0:35    |", "LFO 1"),
      createParam("| +70       | Key Sync          | 0~2:Off,Timbre,Voice                 | +0:36    |", "LFO 1"),
      createParam("| +71       | Tempo Sync        | 0,1:Off,On                           | +0:37    |", "LFO 1"),
      createParam("| +72       | Sync Note         | 0~16:8/1~1/64                 *T02-5 | +0:38    |", "LFO 1")
    ], "LFO", "lfo_1"),

//    new ParamGroup( 76, "LFO 2", 0x00, 0x39, [
    new ParamGroup( 0, "LFO 2", 0x00, 0x00, [
      createParam("| +76       | Wave              | 0~4:Saw,Square+,Sine,S/H,Random      | +0:39    |", "LFO 2"),
      createParam("| +77       | Frequency         | 0~127:0.01~100[kHz]           *T02-4 | +0:3A    |", "LFO 2"),
      createParam("| +78       | Key Sync          | 0~2:Off,Timbre,Voice                 | +0:3B    |", "LFO 2"),
      createParam("| +79       | Tempo Sync        | 0,1:Off,On                           | +0:3C    |", "LFO 2"),
      createParam("| +80       | Sync Note         | 0~16:8/1~1/64                 *T02-5 | +0:3D    |", "LFO 2")
    ], "LFO", "lfo_2")
  ];
};

let oscParameters = () => {
  return [
    createParam("", 0, "Type"     , 0x00, 0x00, oscTypeNames),
    createParam("", 1, "Semitone" , 0x00, 0x01, null),
    createParam("", 2, "Tune"     , 0x00, 0x02, null),
    createParam("", 3, "CTRL1"    , 0x00, 0x03, null),
    createParam("", 4, "CTRL2"    , 0x00, 0x04, null)
  ]
};

let egParameters = () => {
  return [
    createParam("| +0        | Attack Time       | 0~127                                | +0:+0    |", "EG"),
    createParam("| +1        | Decay Time        | 0~127                                | +0:+1    |", "EG"),
    createParam("| +2        | Sustain Level     | 0~127                                | +0:+2    |", "EG"),
    createParam("| +3        | Release Time      | 0~127                                | +0:+3    |", "EG"),
    createParam("| +4        | Level Velo Int.   | -63~0~63                             | +0:+4    |", "EG")
    // createParam("",  0, "Attack",    0x00, 0x00, null, "EG", "attack"),
    // createParam("",  1, "Decay",     0x00, 0x01, null, "EG", "decay"),
    // createParam("",  2, "Sustain",   0x00, 0x02, null, "EG", "sustain"),
    // createParam("",  3, "Release",   0x00, 0x03, null, "EG", "release"),
    // createParam("",  4, "Level Velo Int.", 0x00, 0x04, "-63~0~63", "EG", "lvl_velo_int")
  ]
};

// let lfoParameters = (lfoNum) => {
//   // TODO: different wave lookups for each LFO
//   return [
//     createParam("",  0, "Wave",       0x00, 0x00, null, "LFO", "wave"),
//     createParam("",  1, "Freqency",   0x00, 0x01, null, "LFO", "frequency"),
//     createParam("",  2, "Key Sync",   0x00, 0x02, null, "LFO", "key_sync"),
//     createParam("",  3, "Tempo Sync", 0x00, 0x03, null, "LFO", "tempo_sync"),
//     createParam("",  4, "Sync Note",  0x00, 0x04, null, "LFO", "sync_note")
//   ]
// };

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
  createParam("| +2        | PreFX Drive/Freq  | 0~127                           *4-9 | 06:02    |", "FX"),
  createParam("| +3        | ModFX Type        | 0~5:FLANGER~ROTARY            *T04-2 | 06:03    |", "FX"),
  createParam("| +4        | ModFX SW          | 0~3:Off,TimbreA,TimbreB,TimbreA+B    | 06:04    |", "FX"),
  createParam("| +5        | ModFX Depth       | 0~127                                | 06:05    |", "FX"),
  createParam("| +6        | ModFX Speed       | 0~127                                | 06:06    |", "FX"),
  createParam("| +7        | Rev/Dly Type      | 0~5:HALL~BPM DELAY            *T04-3 | 06:07    |", "FX"),
  createParam("| +8        | Rev/Dly SW        | 0~3:Off,TimbreA,TimbreB,TimbreA+B    | 06:08    |", "FX"),
  createParam("| +9        | Rev/Dly Depth     | 0~127                                | 06:09    |", "FX"),
  createParam("| +10       | Rev/Dly Time      | 0~127                          *4-10 | 06:0A    |", "FX")  
  // createParam("",  0, "PreFX Type",        0x00, 0x00, null, "FX", "prefx_type"),
  // createParam("",  1, "PreFX SW",          0x00, 0x01, "Off,TimbreA,TimbreB,TimbreA+B", "FX", "prefx_sw"),
  // createParam("",  2, "PreFX Drive/Freq",  0x00, 0x02, null, "FX", "prefx_drive"),
  // createParam("",  3, "ModFX Type",        0x00, 0x03, null, "FX", "modfx_type"),
  // createParam("",  4, "ModFX SW",          0x00, 0x04, "Off,TimbreA,TimbreB,TimbreA+B", "FX", "modfx_sw"),
  // createParam("",  5, "ModFX Depth",       0x00, 0x05, null, "FX", "modfx_depth"),
  // createParam("",  6, "ModFX Speed",       0x00, 0x06, null, "FX", "modfx_speed"),
  // createParam("",  7, "Rev/Dly Type",      0x00, 0x07, null, "FX", "revdly_type"),
  // createParam("",  8, "Rev/Dly SW",        0x00, 0x08, "Off,TimbreA,TimbreB,TimbreA+B", "FX", "revdly_sw"),
  // createParam("",  9, "Rev/Dly Depth",     0x00, 0x09, null, "FX", "revdly_depth"),
  // createParam("", 10, "Rev/Dly Speed",     0x00, 0x0A, null, "FX", "revdly_speed")
];

let vocoderParameters = () => [
  // Switch
  createParam("",  0, "SW",                  0x00, 0x00, "Dis,Ena", null, "sw"),

  // Carrier
  createParam("",  1, "TimbreA Level",       0x00, 0x01, null, "Carrier", "timbre_a_level"),
  createParam("",  2, "TimbreB Level",       0x00, 0x02, null, "Carrier", "timbre_b_level"),

  // Modulator
  createParam("",  3, "Audio Source",        0x00, 0x03, null,       "Modulator", "audio_source"),
  createParam("",  4, "Gate Sens",           0x00, 0x04, null,       "Modulator", "gate_sens"),
  createParam("",  5, "Threshold",           0x00, 0x05, null,       "Modulator", "threshold"),
  createParam("",  6, "HPF Level",           0x00, 0x06, null,       "Modulator", "hpf_level"),
  createParam("",  7, "HPF Gate",            0x00, 0x07, "Dis,Ena",  "Modulator", "hpf_gate"),

  // Filter
  createParam("",  8, "Formanto Shift",      0x00, 0x08, null, "Filter", "formanto_shift"),
  createParam("",  9, "Fc offset",           0x00, 0x09, null, "Filter", "fc_offset"),
  createParam("", 10, "Resonance",           0x00, 0x00, null, "Filter", "fc_resonance"),
  createParam("", 11, "Fc Mod Source",       0x00, 0x10, null, "Filter", "fc_mod_source"),
  createParam("", 12, "Fc Mod Intensity",    0x00, 0x11, null, "Filter", "fc_mod_int"),
  createParam("", 13, "E.F.Sens",            0x00, 0x12, null, "Filter", "ef_sens"),

  // Formant Hold Data
  createParam("", 16, "Band 1",              0x00, 0x0E, null, "Formant Hold", "band1", 2),
  createParam("", 18, "Band 2",              0x00, 0x0F, null, "Formant Hold", "band2", 2),
  createParam("", 20, "Band 3",              0x00, 0x10, null, "Formant Hold", "band1", 2),
  createParam("", 22, "Band 4",              0x00, 0x11, null, "Formant Hold", "band2", 2),
  createParam("", 24, "Band 5",              0x00, 0x12, null, "Formant Hold", "band1", 2),
  createParam("", 26, "Band 6",              0x00, 0x13, null, "Formant Hold", "band2", 2),
  createParam("", 28, "Band 7",              0x00, 0x14, null, "Formant Hold", "band1", 2),
  createParam("", 30, "Band 8",              0x00, 0x15, null, "Formant Hold", "band2", 2),
  createParam("", 32, "Band 9",              0x00, 0x16, null, "Formant Hold", "band1", 2),
  createParam("", 34, "Band 10",             0x00, 0x17, null, "Formant Hold", "band2", 2),
  createParam("", 36, "Band 11",             0x00, 0x18, null, "Formant Hold", "band1", 2),
  createParam("", 38, "Band 12",             0x00, 0x19, null, "Formant Hold", "band2", 2),
  createParam("", 40, "Band 13",             0x00, 0x1A, null, "Formant Hold", "band1", 2),
  createParam("", 42, "Band 14",             0x00, 0x1B, null, "Formant Hold", "band2", 2),
  createParam("", 44, "Band 15",             0x00, 0x1C, null, "Formant Hold", "band1", 2),
  createParam("", 46, "Band 16",             0x00, 0x1D, null, "Formant Hold", "band2", 2),

  // Amp
  createParam("", 48, "Vocoder Level",       0x00, 0x1E, null, "Amp", "vocoder_level"),
  createParam("", 49, "Direct Level",        0x00, 0x1F, null, "Amp", "direct_level"),
  createParam("", 50, "Wet Spread",          0x00, 0x20, null, "Amp", "wet_spread"),
  createParam("", 51, "Wet Level",           0x00, 0x21, null, "Amp", "wet_level")
];

let arpeggioParameters = () => [
  createParam("",  0, "Tempo",               0x00, 0x01, null,     null, "tempo", 2),
  createParam("",  2, "Arp SW",              0x00, 0x00, "Off,On", null, "arp_sw"),
  createParam("",  3, "Latch",               0x00, 0x02, "Off,On", null, "latch"),
  createParam("",  4, "Key Sync",            0x00, 0x03, "Off,On", null, "key_sync"),
  createParam("",  5, "Timbre Assign",       0x00, 0x04, "Off,On", null, "timbre_assign"),
  createParam("",  6, "Type",                0x00, 0x05, null,     null, "type"),
  createParam("",  7, "Resolution",          0x00, 0x06, null,     null, "resolution"),
  createParam("",  8, "gate time",           0x00, 0x07, null,     null, "gate_time"),
  createParam("",  9, "Swing",               0x00, 0x08, null,     null, "swing"),
  createParam("", 10, "Last step",           0x00, 0x09, null,     null, "last_step"),
  createParam("", 11, "Octave Range",        0x00, 0x0A, null,     null, "octave_range"),

  // TODO: implement bit parameter? this is a group of bits
  // Step
  createParam("", 12, "Step",                0x00, 0x0B, "Off,On", null, "step")
];





//
// Lookups
//
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
      value:     index,
      name:      row.substr( 0, 16).trim(),
      ctrl1Name: row.substr(16, 16).trim(),
      ctrl2Name: row.substr(32, 16).trim(),
      category:  row.substr(48, 16).trim()
    }
});

let oscTypeNames = oscTypeDictionary.map(item => {
  return item.name;
});



export { oscTypeDictionary };
export default programParameters();
