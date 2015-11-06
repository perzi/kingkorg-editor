import { SET_CURRENT_PROGRAM_NAME, CHANGE_CURRENT_PROGRAM_PARAMETER, LOAD_CURRENT_PROGRAM } from 'actions/actions'

const initialState = {
  currentProgram: {
    name: "",
    data: new Int32Array(316)
  }
};


export default function kingkorgApp(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_PROGRAM_NAME:
      return Object.assign({}, state, {
        currentProgram: {
          name: action.name,
          data: state.currentProgram.data
        }
      });

    case CHANGE_CURRENT_PROGRAM_PARAMETER:

      // TODO: enable update of more than one byte
      return Object.assign({}, state, {
        currentProgram: {
          name: state.currentProgram.name,
          data: [
            ...state.currentProgram.data.slice(0, action.index),
            action.value,
            ...state.currentProgram.data.slice(action.index + 1)
          ]
        }
      });

    case LOAD_CURRENT_PROGRAM:
      var name = "";

      // remove first bytes and the last one
      let programData = action.sysexData.slice(7, action.sysexData.length - 1);

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

      for (let i = 0; i < 12; i++) {
        name = name + String.fromCharCode(data[i]);
      }

      return Object.assign({}, state, {
        currentProgram: {
          name: name,
          data: data
        }
      });

    default:
      return state
  }

  return state;
};
