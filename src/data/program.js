import Parameter       from 'lib/parameter';


//
// let createEGData = => {
//   return {
//
//   }
// };
//
// let createOscData = => {
//   return {
//     type: 0,
//     semitone: 0,
//     tune: 0,
//     ctrl1: 0,
//     ctrl2: 0
//   }
// };
//
// let createLFOData = => {
//   return {
//     wave: 0,
//     frequency: 0,
//     keySync: 0,
//     tempoSync: 0,
//     syncNode: 0
//   }
// };
//
// let createVPatchParameter = => {
//   return {
//   }
// };
//
// let createTimbreParameter = => {
//   return {
//     voiceAssign: 0,
//     unisonSW: 0,
//     unisonDetune: 0,
//     unisonSpread: 0,
//     pitch: {
//       transpose: 0,
//       detune: 0,
//       lfo2ModInt: 0
//       lfo2andJSPlusY:0,
//       bendRange: 0,
//       portamentoSW: 0,
//       portamentoTime: 0,
//       analogTuning: 0
//     },
//     osc: {
//       osc1Data: createOscData(),
//       osc2Data: createOscData(),
//       osc3Data: createOscData()
//     },
//     mixer: {
//       osc1Level: 0,
//       osc2Level: 0,
//       osc3Level: 0
//     },
//     filter:
//       type: 0,
//       cutoff: 0,
//       resonance: 0,
//       eg1Intensity: 0,
//       lfoModInt: 0,
//       lfo1AndJSMinusY: 0,
//       keyboardTrack: 0,
//       velocitySens: 0
//     },
//     amp: {
//       panpot: 0,
//       punchLevel: 0,
//       keyTrack: 0
//     },
//     eg: {
//       eg1Data: createEGData(),
//       eg2Data: createEGData(),
//     },
//     lfo1: createLFOData(),
//     lfo2: createLFOData()
//   };
// }


// // TODO: put values in an array? no need for an named key?
// let programDefinition = {
//
//   name: new Parameter({
//     offset: 0,
//     name: "Name",
//     type: "ascii", // ?
//     length: 12
//   }),
//
//   category: new Parameter({
//     offset: 12,
//     name: "Category",
//     value: "0~8:Synth,Lead,Bass,Brass,Strings,Piano,Key,SE/Voc,User"
//   }),
//
//   voiceMode: new Parameter({
//     offset: 13,
//     name: "Voice Mode",
//     value: "0~2:Single,Layer,Split"
//   }),
//
//   voiceMode: new Parameter({
//     offset: 14,
//     name: "TimbreB MIDI Ch.",
//     value: "0~15,16~:1~16,Global"
//   }),
//
//   splitKey: "15        | Split Key         | 0~127:C-1~G9",
//
// "| 13        | Voice Mode        | 0~2:Single,Layer,Split               | 00:0D    |"
// "| 14        | TimbreB MIDI Ch.  | 0~15,16~:1~16,Global                 | 00:0E    |"
// "| 15        | Split Key         | 0~127:C-1~G9                         | 00:0F    |"
//
// };


// let program = {
//   name: "",
//   category: 0,
//   voiceMode: 0,
//   timbreBMIDIChannel: 0,
//   splitKey: 0,
//   timbreAData: {
//     timbreParameter: createTimbreParameter(),
//     vPatchParameter: createVPatchParameter()
//   },
//   timbreBData: {
//     timbreParameter: createTimbreParameter(),
//     vPatchParameter: createVPatchParameter()
//   },
//   effectData: {
//
//   },
//   vocoderData: {
//
//   },
//   arpeggioData: {
//
//   },
//   keyResponse: 0
// };

let createTimbreBMIDIChLookup = () => {
  let l = {};
  for (let i = 0; i < 16; i++) {
    l[i] = i + 1;
  }
  for (let i = 16; i < 128; i++) {
    l[i] = "Global"
  }
  return l;
}

let createSplitKeyLookup = () => {

  let keys = "C,C#,D,D#,E,F,F#,G,G#,A,A#,B".split(",");

  let l = {};
  for (let i = 0; i < 128; i++) {
    let k = i % 12;
    let o = Math.floor(i / 12) + 1;
    l[i] = keys[k] + "-" + o;
  }

  return l;
}

var paramNumber = 13;

// // TODO: put values in an array? no need for an named key?
let program = [
  new Parameter({
    number: paramNumber++,
    name: "category",
    title: "Category",
    lookup: {
      0: "Synth",        3: "Brass",        6: "Key",
      1: "Lead",         4: "Strings",      7: "SE/Voc",
      2: "Bass",         5: "Piano",        8: "User"
    }
  }),
  new Parameter({
    number: paramNumber++,
    title: "Voice Mode",
    lookup: {
      0: "Single",
      1: "Layer",
      2: "Split"
    }
  }),
  new Parameter({
    number: paramNumber++,
    title: "TimbreB MIDI Ch.",
    lookup: createTimbreBMIDIChLookup()
  }),
  new Parameter({
    number: paramNumber++,
    title: "Split Key",
    lookup: createSplitKeyLookup()
  })
];
//
//   name: new Parameter({
//     offset: 0,
//     name: "Name",
//     type: "ascii", // ?
//     length: 12
//   }),
//
//   category: new Parameter({
//     offset: 12,
//     name: "Category",
//     value: "0~8:Synth,Lead,Bass,Brass,Strings,Piano,Key,SE/Voc,User"
//   }),
//
//   voiceMode: new Parameter({
//     offset: 13,
//     name: "Voice Mode",
//     value: "0~2:Single,Layer,Split"
//   }),
//
//   voiceMode: new Parameter({
//     offset: 14,
//     name: "TimbreB MIDI Ch.",
//     value: "0~15,16~:1~16,Global"
//   }),
//
//   splitKey: "15        | Split Key         | 0~127:C-1~G9",
//
// "| 13        | Voice Mode        | 0~2:Single,Layer,Split               | 00:0D    |"
// "| 14        | TimbreB MIDI Ch.  | 0~15,16~:1~16,Global                 | 00:0E    |"
// "| 15        | Split Key         | 0~127:C-1~G9                         | 00:0F    |"
//
// };


export default program;
