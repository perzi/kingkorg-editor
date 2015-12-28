/*
 * action types
 */

export const SET_CURRENT_PROGRAM_NAME         = 'SET_CURRENT_PROGRAM_NAME';
export const CHANGE_CURRENT_PROGRAM_PARAMETER = 'CHANGE_CURRENT_PROGRAM_PARAMETER';
export const LOAD_CURRENT_PROGRAM             = 'LOAD_CURRENT_PROGRAM';

/*
 * action creators
 */
export function setCurrentProgramName(name) {
  return { type: SET_CURRENT_PROGRAM_NAME, name }
}

export function updateCurrentProgramParam(index, value) {
  return { type: CHANGE_CURRENT_PROGRAM_PARAMETER, index, value }
}

export function loadCurrentProgram(sysexData) {
  return { type: LOAD_CURRENT_PROGRAM, sysexData }
}



//
//   setName(name) {
//     this.dispatch(Immutable.fromJS({
//       name: name
//     }));
//   }
//
//   updateParam(offset, value) {
//     this.dispatch({
//       index: offset,
//       value: value
//     });
//   }
//
//   fromData(sysexData) {
//
//     var name = "";
//
//     // remove first bytes and the last one
//     let programData = sysexData.slice(7, sysexData.length - 1);
//
//     let data = [];
//
//     for (let i = 0; i < programData.length; i++) {
//
//       let r = i % 8; // get order
//
//       if (r !== 0) {
//         let highbits = programData[Math.floor(i / 8) * 8];
//         let highbit = (highbits << (8 - r)) & 0b10000000;
//         let value = highbit | programData[i];
//
//         data.push(value);
//       }
//     }
//
//     for (let i = 0; i < 12; i++) {
//       name = name + String.fromCharCode(data[i]);
//     }
//
//     this.dispatch(Immutable.fromJS({
//       data: data,
//       name: name
//     }));
//   }
// }
