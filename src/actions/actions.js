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
  return {
    type: SET_CURRENT_PROGRAM_NAME,
    payload: {
      name
    }
  }
}

export function updateCurrentProgramParam(index, values) {
  return {
    type: CHANGE_CURRENT_PROGRAM_PARAMETER,
    payload: {
      index,
      values
    }
  }
}

export function loadCurrentProgram(sysexData) {

  let program = convertSysexDataToProgram(sysexData)

  return {
    type: LOAD_CURRENT_PROGRAM,
    payload: program
  }
}

export function setCurrentProgram(data) {
  return {
    type: LOAD_CURRENT_PROGRAM,
    payload: {
      name: getProgramName(data),
      data
    }
  }
}

//
// Helpers
//
function getProgramName(data) {
  let name = ""
  for (let i = 0; i < 12; i++) {
    name = name + String.fromCharCode(data[i]);
  }

  return name;
}

function convertSysexDataToProgram(sysexData) {

  // remove first bytes and the last one
  let programData = sysexData.slice(7, sysexData.length - 1);

  let data = [];

  for (let i = 0; i < programData.length; i++) {

    let r = i % 8; // get order

    if (r !== 0) {
      let highbits = programData[Math.floor(i / 8) * 8];
      let highbit = (highbits << (8 - r)) & 0b10000000;
      let value = highbit | programData[i];

      data.push(value);
    }
  }

  let name = getProgramName(data);

  return {
    name,
    data
  }
}
